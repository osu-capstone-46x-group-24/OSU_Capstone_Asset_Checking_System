// CRUDatabaseElement.tsx

// Imports
import type {DB_Item, ReqItem} from "../../../.d.ts";
import {sendPostRequest} from "../API/OutboundNetworkHandler.ts";
import React from "react";

type CRUDatabaseElementProps = {
    color_primary_text: string;
    color_primary_bg: string;
    color_accent_text: string;
    color_accent_bg: string;
    onRequest: (req: ReqItem) => void;
}


// Items
// POST - /items - DB_Item {name: string, rfid: string}

/**
 * Name: CRUDatabaseElements
 * Description: Allows users to perform CRUD operations on backend database elements from the frontend
 *      - presumably from the admin dashboard.
 */
export default function CRUDatabaseElement({ onRequest }: CRUDatabaseElementProps) {

    // onRequest - used for logging in AdminDashboard (will be used to send transaction logs to backend)

    // CRUD's ADD functionality -- add an item to the database
    // POST to ~/items
    async function AddItem(name: string, rfid: string): void {
        try {
            const itemToAdd: DB_Item = {name, rfid};
            console.log("POST request to /items sent [", itemToAdd, "]...");
            const result: string = await sendPostRequest("/items", itemToAdd);
            console.log("OUTPUT: ", result);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unknown Error";
            console.error("Error: ", message);
        }
    }
};
