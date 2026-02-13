// useSocket.tsx

// Imports
import { io } from "socket.io-client";
//import configJson from "../spec_config.json";
import { useEffect } from "react";
import type { ReqItem } from "../../../.d.ts";

// Constants
const PORT = 3003;
const BASE_URL: string = `http://localhost:${PORT}`;
const socket = io(BASE_URL);

/**

 * Name: useSocket
 * Type: Hook
 * Description: Listens for socket events from *scanner* server
 * Props: onRequest: (req: ReqItem)
 * Return: void
 */
export function useSocket(onRequest: (req: ReqItem) => void) {
    useEffect(() => {
        function getTimeStamp(): string {
            const epochTime = Date.now();
            return new Date(epochTime).toLocaleString();
        }

        // Used as callback
        const sendRequestToParent = (
            requestType: string,
            message: string,
            requestSender: string,
            httpType: string,
            endpoint: string
        ) => {
            onRequest({
                reqType: requestType,
                sender: requestSender,
                destination: "frontend",
                endpoint: endpoint,
                itemName: message,
                timestamp: getTimeStamp(),
                httpType: httpType,
            });
        };

        // Listen for socket events - Scanner
        // Message Event
        socket.on("message", (msg: string): void => {
            console.log(`Message from server: ${msg}`);
            sendRequestToParent("MSG", msg, "scanner", "POST", "frontend");
        });

        // Card Event
        socket.on("card", (cardId: string): void => {
            console.log(`Card scanned: ${cardId}`);
            sendRequestToParent("CARD", cardId, "scanner", "POST", "frontend");
        });

        // Item Event
        socket.on("item", (itemId: string): void => {
            console.log(`Item scanned: ${itemId}`);
            sendRequestToParent("ITEM", itemId, "scanner", "POST", "frontend");
        });

        // Cleanup / Unmount
        return () => {
            socket.off("message");
            socket.off("card");
            socket.off("item");
        };
    }, [onRequest]);

    return null;
}
