// Type definitions for ctsLib [Capstone Type System Library] v1
// docs reference (https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html)


// Request Items
interface ReqItem {
    raw: string;
    reqType: string;
    sender: string;
    itemName: string;
    timestamp: string;
}