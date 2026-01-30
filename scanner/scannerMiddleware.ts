import HID from 'node-hid';

const VENDOR_ID = 3111;
const PRODUCT_ID = 15354;

const POLL_DELAY = 250;
const RECONNECT_DELAY = 15000;

let device: HID.HID | null = null;
let timer: NodeJS.Timeout | null = null;

// connect/disconnect

function connectToDevice() {
    try {
        const deviceInfo = HID.devices().find(
            (d) => d.vendorId === VENDOR_ID && d.productId === PRODUCT_ID,
        );
        if (!deviceInfo) throw new Error('rfIDEAS device not found');
        if (!deviceInfo.path) throw new Error('Device path not found');

        const dev = new HID.HID(deviceInfo.path);
        return dev;
    } catch (error) {
        console.error('Connection error:', error);
        return null;
    }
}

function disconnectDevice(reason?: string) {
    if (reason) {
        console.error('Disconnected:', reason);
    }
    try {
        device?.close();
    } catch {}
    device = null;
}

// helpers
// send 8 payload bytes as a feature report
function setFeature8(hex8bytes: string, dev: HID.HID) {
    const payload = Buffer.from(hex8bytes, 'hex');
    if (payload.length !== 8) throw new Error('payload must be 8 bytes');

    // [reportId, ...payload], report id = 0
    const buf = Buffer.concat([Buffer.from([0x00]), payload]); // total 9 bytes
    dev.sendFeatureReport([...buf]);
}

// read 8 payload bytes from a feature report
function getFeature8(dev: HID.HID): Buffer {
    const array = dev.getFeatureReport(0x00, 9); // report id = 0, total 9 bytes
    const buf = Buffer.from(array);
    if (buf.length !== 9)
        throw new Error('expected 9 bytes from getFeatureReport');
    const data = buf.subarray(1); // skip report id
    return data;
}

// convert card data bugger to formatted hex string
function normalizeData(data: Buffer): string {
    const array = Array.from(data);

    return array
        .reverse()
        .map((b) => b.toString(16).padStart(2, '0'))
        .join(':');
}

function isAllZero(data: Buffer): boolean {
    return data.every((b) => b === 0);
}

type ScanType = 'Card' | 'Item';
function getScanType(ack: Buffer): ScanType {
    const metaArray = Array.from(ack);
    const bytesRead = metaArray[3];
    return bytesRead === 45 ? 'Card' : 'Item';
}

// main
// MIGHT NOT NEED THESE?
// const SETUP_FEATURES = [
//     "8f00000000000000",
//     "8e00000000000000"
// ];

// for (const feature of SETUP_FEATURES) {
//     setFeature8(feature);
//     const resp = getFeature8();
// }

// console.log("Setup complete.");

function startPolling() {
    if (!device) return;
    timer = setInterval(() => {
        try {
            if (!device) return;

            // read last card data
            setFeature8('8c02000100000000', device);
            const raw = getFeature8(device);
            if (isAllZero(raw)) return;

            setFeature8('8c02040100000000', device); // clear card data
            const ack = getFeature8(device);

            console.log('Card data: ', normalizeData(raw));
            console.log('Scan type:', getScanType(ack));
        } catch (error) {
            if (timer) {
                clearInterval(timer);
            }
            timer = null;
            disconnectDevice('Error during polling');
            scheduleReconnect();
        }
    }, POLL_DELAY);
}

function scheduleReconnect() {
    setTimeout(() => {
        if (device) return; // already connected
        const dev = connectToDevice();
        if (!dev) return scheduleReconnect();

        device = dev;
        console.log('Reconnected to device.');
        startPolling();
    }, RECONNECT_DELAY);
}

function main() {
    device = connectToDevice();
    if (device) {
        console.log('Connected to device.');
        startPolling();
    } else {
        console.log('Device not found, scheduling reconnect...');
        scheduleReconnect();
    }
}

process.on('SIGINT', () => {
    if (timer) clearInterval(timer);
    disconnectDevice('SIGINT');
    process.exit(0);
});

main();
