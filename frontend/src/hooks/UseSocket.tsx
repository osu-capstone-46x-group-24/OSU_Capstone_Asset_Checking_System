// useSocket.tsx

// Imports
import { io } from "socket.io-client";

// Constants
const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const socket = io(BASE_URL);

/**
 * useSocket Hook
 */
export default function useSocket() {
    socket.on("card", (cardId) => {
        console.log("Received card event: ", cardId);
    });
}
