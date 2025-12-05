// UseSocket.tsx

// Imports
import {io} from "socket.io-client";
import configJson from "../spec_config.json";
import {useEffect} from "react";

// Constants
const PORT: number = configJson.scanner.port;
const BASE_URL: string = `http://localhost:${PORT}`;
const socket = io(BASE_URL);

// Types
type ReqItem = {
    reqType: string;
    sender: string;
    itemName: string;
    timestamp: string;
    raw: string;
};

/**

 * Name: UseSocket
 * Type: Hook
 * Description: Listens for socket events from *scanner* server
 * Props: onRequest: (req: ReqItem)
 * Return: void
 */
export default function UseSocket(onRequest: (req: ReqItem) => void) {

    useEffect(() => {
        function getTimeStamp(): string {
            const epochTime = Date.now();
            return new Date(epochTime).toLocaleString();
        }

        // Used as callback
        const sendRequestToParent = ( requestType: string, message: string, requestSender: string) => {
            onRequest({
                reqType: requestType,
                sender: requestSender,
                itemName: message,
                timestamp: getTimeStamp(),
                raw: message,
            });
        };

        // Listen for socket events - Scanner
        // Message Event
        socket.on("message", (msg: string): void => {
            console.log(`Message from server: ${msg}`);
            sendRequestToParent("message", msg, "scanner");
        });

        // Card Event
        socket.on("card", (cardId: string): void => {
            console.log(`Card scanned: ${cardId}`);
            sendRequestToParent("card", cardId, "scanner");
        });

        // Item Event
        socket.on("item", (itemId: string): void => {
            console.log(`Item scanned: ${itemId}`);
            sendRequestToParent("item", itemId, "scanner");
        });

        // Listen for socket events - Backend

        // Cleanup / Unmount
        return () => {
            socket.off("message");
            socket.off("card");
            socket.off("item");
        };
    }, [onRequest]);

    return null;
    };