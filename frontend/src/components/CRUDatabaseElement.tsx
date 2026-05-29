// CRUDatabaseElement.tsx

// Imports
import type { DB_Item } from "../../../.d.ts";
import { sendPostRequest } from "../API/OutboundNetworkHandler.ts";
import React from "react";
import ButtonDefault from "./UI_Elements/ButtonDefault.tsx";
// import React from "react";

type CRUDatabaseElementProps = {
    color_primary_text: string;
    color_primary_bg: string;
    color_accent_text: string;
    color_accent_bg: string;
    // onRequest: (req: ReqItem) => void;
};

// Items
// POST - /items - DB_Item {name: string, rfid: string}

/**
 * Name: CRUDatabaseElements
 * Description: Allows users to perform CRUD operations on backend database elements from the frontend
 *      - presumably from the admin dashboard.
 */
export default function CRUDatabaseElement({
    color_primary_text,
    color_primary_bg,
    color_accent_text,
    color_accent_bg,
}: CRUDatabaseElementProps) {
    // onRequest - used for logging in AdminDashboard (will be used to send transaction logs to backend)
    const [name, setName] = React.useState("");
    const [RFID, setRFID] = React.useState("");
    // CRUD's ADD functionality -- add an item to the database
    // POST to ~/items
    async function AddItem(name: string, rfid: string) {
        try {
            const itemToAdd: DB_Item = { name, rfid };
            console.log("POST request to /items sent [", itemToAdd, "]...");
            const result: string = await sendPostRequest("/items", itemToAdd);
            console.log("OUTPUT: ", result);
            setName("");
            setRFID("");
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unknown Error";
            console.error("Error: ", message);
        }
    }

    return (
        <>
            <div
                className={`p-6 rounded-sm h-full w-full gap-6 flex-col flex shadow-lg text-${color_primary_text} bg-${color_primary_bg} `}
            >
                <div>
                    <span className={`text-2xl`}>Create</span>
                </div>
                <form>
                    <div className={`flex flex-col items-start`}>
                        <span className={`pl-6`}>Name</span>
                        <input
                            id={"name_form"}
                            placeholder={"Insert Name..."}
                            type={"text"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full h-10 bg-${color_accent_bg} rounded-sm text-${color_accent_text} pl-6`}
                        />
                        <span className={`pl-6`}>RFID</span>
                        <input
                            id={"rfid_form"}
                            placeholder={"Insert RFID..."}
                            type={"text"}
                            onChange={(e) => setRFID(e.target.value)}
                            className={`w-full h-10 bg-${color_accent_bg} rounded-sm text-${color_accent_text} pl-6`}
                        />
                    </div>
                    <div className={`mt-6 rounded-sm`}>
                        <ButtonDefault
                            onClick={() => AddItem(name, RFID)}
                            className={``}
                            children={"Create DB Element"}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
