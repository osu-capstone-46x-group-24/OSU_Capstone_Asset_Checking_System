// NetworkManager.tsx

// Types
type ReqItem = {
    reqType: string;
    sender: string;
    itemName: string;
    timestamp: string;
    raw: string;
};

// Const
let inboundNetworkQueue: ReqItem[] = [];

/**
 * Name: NetworkManager
 * Type: Hook
 * Description: ...
 * Props: ...
 * Returns: ...
 */
async function NetworkManager() {
    await inboundNetworkQueue.length >= 1;
    // Scanner

    // Backend
}

async function queueUpdate() {
    return new Promise((resolve) => {
        
    })
}