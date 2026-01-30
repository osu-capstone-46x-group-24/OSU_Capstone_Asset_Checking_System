// Type definitions for ctsLib [Capstone Type System Library] v1
// docs reference (https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html)


// Request Items
export type ReqItem = {
    reqType: string;
    sender: string;
    destination: string;
    itemName: string;
    timestamp: string;
    httpType: string;
    endpoint: string;
};