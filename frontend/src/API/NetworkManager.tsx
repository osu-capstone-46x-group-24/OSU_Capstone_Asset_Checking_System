// NetworkManager.tsx

// Types
import React, { useCallback, useMemo } from "react";
import "./OutboundNetworkHandler.ts";
import { sendGetRequest, sendPostRequest } from "./OutboundNetworkHandler.ts";
import { Button, Option, Select } from "@material-tailwind/react";
import ButtonDefault from "../components/UI_Elements/ButtonDefault.tsx";

type ReqItem = {
    reqType: string;
    sender: string;
    itemName: string;
    timestamp: string;
    raw: string;
};

// Const
let inboundNetworkQueue: ReqItem[] = [];
const examplePostRequest = {
    userId: 0,
    itemId: 0,
    timestampId: 0,
};
const exampleGetRequest = {};

/**
 * Name: NetworkManager
 */
export default function NetworkManager() {
    const [reqType, setReqType] = React.useState("react");
    const [reqEndpoint, setReqEndpoint] = React.useState("react");

    const handleSubmit = async (type: string, endpoint: string) => {
        try {
            console.log("Request [", type, "], [", endpoint, "]...");
            if (type === "POST") {
                const result = await sendPostRequest(endpoint);
            } else if (type === "GET") {
                const result = await sendGetRequest(endpoint);
            }

            console.log("Success: ", result);
        } catch (err) {
            console.error("Error: ", err.message);
        }
    };

    return (
        <>
            <div>
                <ButtonDefault
                    onClick={() => handleSubmit(reqType, reqEndpoint)}
                    children={"Send Request"}
                />
                <div className={`w-1/2 flex flex-row bg-wuGrey-100`}>
                    <Select
                        className="h-15 w-50"
                        value={reqType}
                        onChange={(val) => setReqType(val)}
                        label="Select Request Type"
                        placeholder={undefined}
                        onResize={undefined}
                        onResizeCapture={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        <Option className="text-gray-400" value="null">
                            Select...
                        </Option>
                        <Option value="GET">GET</Option>
                        <Option value="POST">POST</Option>
                    </Select>
                    <Select
                        className="h-15 w-50"
                        value={reqEndpoint}
                        onChange={(val) => setReqEndpoint(val)}
                        label="Select Endpoint"
                        placeholder={undefined}
                        onResize={undefined}
                        onResizeCapture={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        <Option
                            className="bg-wuGrey-300 text-gray-400"
                            value="null"
                        >
                            Select...
                        </Option>
                        <Option value="/checkin">/checkin</Option>
                        <Option value="/checkout">/checkout</Option>
                        <Option value="/items">/items</Option>
                        <Option value="/items/available">
                            /items/available
                        </Option>
                        <Option value="/items/all">/items/all</Option>
                    </Select>
                </div>
            </div>
        </>
    );
}
