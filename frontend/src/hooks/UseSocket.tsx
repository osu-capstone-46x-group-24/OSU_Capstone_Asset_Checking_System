// useSocket.tsx

// Imports
import { io } from "socket.io-client";
import configJson from "../spec_config.json";

// Constants
const PORT: number = configJson.scanner_config.port;
const BASE_URL: string = `http://localhost:${PORT}`;
const socket = io(BASE_URL);

type ReqItem = {
    reqType: string;
    itemName: string;
    timestamp: string;
    raw: string;
};

/**
 * useSocket Hook
 * Listens for socket events from *scanner* server
 */
export default function useSocket({ onRequest }: { onRequest: any }) {
    function sendRequestToParent(requestType: string, message: string) {
        const newRequest: ReqItem = {
            reqType: requestType,
            itemName: message,
            timestamp: getTimeStamp(),
            raw: message,
        }
        onRequest(newRequest);
    }

    function getTimeStamp(): string {
        let epochTime = Date.now();
        let formattedTime = new Date(epochTime).toString();
        return formattedTime;
    }

    // listen for socket events
    socket.on("message", (msg: string): void => {
        console.log(`Message from server: ${msg}`);
        sendRequestToParent("message", msg);
    });

    socket.on("card", (cardId: string): void => {
        console.log(`Card scanned: ${cardId}`);
        sendRequestToParent("card", cardId);
    });

    socket.on("item", (itemId: string): void => {
        console.log(`Item scanned: ${itemId}`);
        sendRequestToParent("item", itemId);
    });

    return (
        <>
        </>
    );
}
