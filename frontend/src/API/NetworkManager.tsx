// NetworkManager.tsx

// Imports
import React from "react";
import "./OutboundNetworkHandler.ts";
import { sendGetRequest, sendPostRequest } from "./OutboundNetworkHandler.ts";
import { Option, Select } from "@material-tailwind/react";
import ButtonDefault from "../components/UI_Elements/ButtonDefault.tsx";
import type { ReqItem } from "../../../.d.ts";

// Types
type NetworkManagerProps = {
    color_primary_text: string;
    color_primary_bg: string;
    color_accent_text: string;
    color_accent_bg: string;
    onRequest: (req: ReqItem) => void;
};

type RequestType = "GET" | "POST" | "";

/**
 * Name: NetworkManager
 */
export default function NetworkManager({
    color_primary_text,
    color_primary_bg,
    color_accent_text,
    color_accent_bg,
    onRequest,
}: NetworkManagerProps) {
    const [reqType, setReqType] = React.useState<RequestType>("");
    const [reqEndpoint, setReqEndpoint] = React.useState("");

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
            destination: "backend",
            endpoint: endpoint,
            itemName: message,
            timestamp: getTimeStamp(),
            httpType: httpType,
        });
    };

    const endpointListings = [
        { _value: "/", text: "/" },
        { _value: "/checkin", text: "/checkin" },
        { _value: "/checkout", text: "/checkout" },
        { _value: "/items", text: "/items" },
        { _value: "/items/available", text: "/items/available" },
        { _value: "/items/all", text: "/items/all" },
        { _value: "/canary", text: "/canary" }
    ]

    const requestListings = [
        { _value: "GET", text: "GET" },
        { _value: "POST", text: "POST" }
    ]

    const handleSubmit = async (type: string, endpoint: string) => {
        try {
            console.log("Request [", type, "], [", endpoint, "]...");
            if (type === "POST") {
                const result: string = await sendPostRequest(endpoint);
                console.log("Success: ", result);
                sendRequestToParent("API", result, "frontend", type, endpoint);
            } else if (type === "GET") {
                const result = await sendGetRequest(endpoint);
                console.log("Success: ", result);
                sendRequestToParent("API", result, "frontend", type, endpoint);
            } else {
                const result = "ERROR";
                console.log("Success: ", result);
                sendRequestToParent("API", result, "frontend", type, endpoint);
            }
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unknown Error";
            console.error("Error: ", message);
            sendRequestToParent("API", message, "frontend", type, endpoint);
        }
    };

    return (
        <>
            <div
                className={`rounded-sm h-50 w-120 gap-6 flex-col flex shadow-lg text-${color_primary_text} bg-${color_primary_bg}`}
            >
                <div
                    className={`flex flex-row gap-6 m-6 min-h-12 text-wuGrey-100 bg-${color_primary_bg}`}
                >

                    <Select
                        value={reqType}
                        className={`h-8 text-center`}
                        onChange={(val) => {
                            if (val) {
                                setReqType(val! as RequestType);
                            }
                        }}
                        label="Select Request Type"
                        placeholder={undefined}
                        onResize={undefined}
                        onResizeCapture={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        {(requestListings.map((entry, index: number) => (
                            <Option
                                key={index}
                                value={entry._value}
                                className={`bg-${color_accent_bg} text-${color_accent_text}`}
                                children={entry.text}
                            />
                        )))}
                    </Select>
                    <Select
                        value={reqEndpoint}
                        className={`h-8 text-center`}
                        onChange={(val) => {
                            if (val) {
                                setReqEndpoint(val);
                            }
                        }}
                        label="Select Endpoint"
                        placeholder={undefined}
                        onResize={undefined}
                        onResizeCapture={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        {(endpointListings.map((entry, index: number) => (
                            <Option
                                key={index}
                                value={entry._value}
                                className={`bg-${color_accent_bg} text-${color_accent_text}`}
                                children={entry.text}
                            />
                        )))}
                    </Select>
                </div>
                <div>
                    <ButtonDefault
                        onClick={() => handleSubmit(reqType, reqEndpoint)}
                        children={"Send Request ⇨"}
                        className={`ml-6`}
                    />
                </div>
            </div>
        </>
    );
}
