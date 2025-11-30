// UseSocket.tsx

// Imports
import {io} from "socket.io-client";
import configJson from "../spec_config.json";
import {useEffect} from "react";

// Constants
const PORT: number = configJson.scanner.port;
const BASE_URL: string = `http://localhost:${PORT}`;
const socket = io(BASE_URL);

type ReqItem = {
    reqType: string;
    sender: string;
    itemName: string;
    timestamp: string;
    raw: string;
};

/**
 * useSocket Hook
 * @type Hook
 * Listens for socket events from *scanner* server
 */
export default function UseSocket(onRequest: (req: ReqItem) => void) {

    useEffect(() => {
        function getTimeStamp(): string {
            const epochTime = Date.now();
            return new Date(epochTime).toLocaleString();
        }

        const sendRequestToParent = ( requestType: string, message: string, requestSender: string) => {
            onRequest({
                reqType: requestType,
                sender: requestSender,
                itemName: message,
                timestamp: getTimeStamp(),
                raw: message,
            });
        };

        // listen for socket events
        socket.on("message", (msg: string): void => {
            console.log(`Message from server: ${msg}`);
            sendRequestToParent("message", msg, "scanner");
        });

        socket.on("card", (cardId: string): void => {
            console.log(`Card scanned: ${cardId}`);
            sendRequestToParent("card", cardId, "scanner");
        });

        socket.on("item", (itemId: string): void => {
            console.log(`Item scanned: ${itemId}`);
            sendRequestToParent("item", itemId, "scanner");
        });

        // Cleanup / Unmount
        return () => {
            socket.off("message");
            socket.off("card");
            socket.off("item");
        };
    }, [onRequest]);

    return null;
    };