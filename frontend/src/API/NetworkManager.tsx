// NetworkManager.tsx

// Types
import React from "react";
import "./OutboundNetworkHandler.ts";
import { sendGetRequest, sendPostRequest } from "./OutboundNetworkHandler.ts";
import { Option, Select } from "@material-tailwind/react";
import ButtonDefault from "../components/UI_Elements/ButtonDefault.tsx";

type ReqItem = {
    reqType: string;
    sender: string;
    destination: string;
    itemName: string;
    timestamp: string;
    httpType: string;
    endpoint: string;
};

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
                        className={`text-center`}
                        onChange={(val) => setReqType(val)}
                        label="Select Request Type"
                        placeholder={undefined}
                        onResize={undefined}
                        onResizeCapture={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        <Option
                            value="GET"
                            className={`bg-${color_accent_bg} text-${color_accent_text}`}
                        >
                            GET
                        </Option>
                        <Option
                            value="POST"
                            className={`bg-${color_accent_bg} text-${color_accent_text}`}
                        >
                            POST
                        </Option>
                    </Select>
                    <Select
                        value={reqEndpoint}
                        className={`text-center`}
                        onChange={(val) => setReqEndpoint(val)}
                        label="Select Endpoint"
                        placeholder={undefined}
                        onResize={undefined}
                        onResizeCapture={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        <Option
                            value="/"
                            className={`bg-${color_accent_bg} text-${color_accent_text}`}
                        >
                            /
                        </Option>
                        <Option
                            value="/checkin"
                            className={`bg-${color_accent_bg} text-${color_accent_text}`}
                        >
                            /checkin
                        </Option>
                        <Option
                            value="/checkout"
                            className={`bg-${color_accent_bg} text-${color_accent_text}`}
                        >
                            /checkout
                        </Option>
                        <Option
                            value="/items"
                            className={`bg-${color_accent_bg} text-${color_accent_text}`}
                        >
                            /items
                        </Option>
                        <Option
                            value="/items/available"
                            className={`bg-${color_accent_bg} text-${color_accent_text}`}
                        >
                            /items/available
                        </Option>
                        <Option
                            value="/items/all"
                            className={`bg-${color_accent_bg} text-${color_accent_text}`}
                        >
                            /items/all
                        </Option>
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
