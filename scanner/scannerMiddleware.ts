import HID from 'node-hid';
import { usb } from 'usb';
import dotenv from 'dotenv';
dotenv.config();

// constants
const baseUrl = process.env.BASE_URL || `http://localhost:3000`;

const VENDOR_ID = 3111;
const PRODUCT_ID = 15354;

const POLL_DELAY = 250;
const LOGGING_ENABLED = false;

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
        console.log('Device connected');
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
        console.log('Device disconnected');
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

function startPolling() {
    if (!device) return;
    timer = setInterval(() => {
        try {
            if (LOGGING_ENABLED) console.log('polling');
            if (!device) return;

            // read last card data
            setFeature8('8c02000100000000', device);
            const raw = getFeature8(device);
            if (isAllZero(raw)) return;

            setFeature8('8c02040100000000', device); // clear card data
            const ack = getFeature8(device);

            if (LOGGING_ENABLED) console.log('Card data: ', normalizeData(raw));
            if (LOGGING_ENABLED) console.log('Scan type:', getScanType(ack));
        } catch (error) {
            console.error('Polling error:', error);
        }
    }, POLL_DELAY);
}

function stopPolling() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function main() {
    device = connectToDevice();
    if (device) {
        console.log('Connected to device.');
        startPolling();
    }
}

process.on('SIGINT', () => {
    if (timer) clearInterval(timer);
    disconnectDevice('SIGINT');
    process.exit(0);
});

usb.on('attach', (d) => {
    if (
        d.deviceDescriptor.idVendor !== VENDOR_ID ||
        d.deviceDescriptor.idProduct !== PRODUCT_ID
    )
        return;
    console.log('Scanner plugged in');
    device = connectToDevice();
    startPolling();
});

usb.on('detach', (d) => {
    if (
        d.deviceDescriptor.idVendor !== VENDOR_ID ||
        d.deviceDescriptor.idProduct !== PRODUCT_ID
    )
        return;
    console.log('Scanner unplugged');
    stopPolling();
    disconnectDevice('unplugged');
});

main();
