// ServiceStatusIndicator.tsx

// Imports
import React, { useEffect, useRef, useState } from "react";
import configJson from "../spec_config.json";

// Types
type ServiceStatusIndicatorConsoleProps = {
    color_primary_text: string;
    color_primary_bg: string;
    color_accent_text: string;
    color_accent_bg: string;
};

// Example Canary Request
/*
{
    "connection": {
        "address": "::1",
        "addressType": "IPv6",
        "port": 54609
    },
    "uptime": 99071331,
    "timestamp": "2026-02-14T21:45:39.450Z"
}
*/

// Constants
const color_placeholder_text = "wu-gray-300";
type statusTypes = "online" | "offline" | "error";
const exampleStatusList = [
    {
        connection: {
            address: "::1",
            addressType: "IPv6",
            port: 54609,
        },
        uptime: 99071331,
        timestamp: "2026-02-14T21:45:39.450Z",
    },
    {
        connection: {
            address: "::1",
            addressType: "IPv6",
            port: 54609,
        },
        uptime: 99072012,
        timestamp: "2026-02-14T21:47:44.580Z",
    },
];

/**
 * Name: Service Status Indicator
 * Type: Component
 * Description: Takes styling properties as props and displays a console that displays incoming requests caught via the useSocket.tsx hook
 * Props: color_primary_text, color_primary_bg, color_accent_text, color_accent_bg
 */
export default function ServiceStatusIndicator({
    color_primary_text,
    color_primary_bg,
    color_accent_text,
    color_accent_bg,
}: ServiceStatusIndicatorConsoleProps) {
    const [scannerStatus, setScannerStatus] =
        React.useState<statusTypes>("offline");
    const [backendStatus, setBackendStatus] =
        React.useState<statusTypes>("offline");

    function getStatusColor(status: statusTypes) {
        if (status === "online") {
            return configJson.theme.color.status.online;
        } else if (status === "offline") {
            return configJson.theme.color.status.offline;
        } else if (status === "error") {
            return configJson.theme.color.status.error;
        } else {
            return configJson.theme.color.status.error;
        }
    }

    return (
        <>
            <div
                className={`rounded-sm h-50 w-75 gap-6 flex-col flex shadow-lg text-${color_primary_text} bg-${color_primary_bg}`}
            >
                <div
                    className={`flex flex-col m-6 min-h-12 gap-6 justify-between text-wuGrey-100`}
                >
                    <div className={"w-full bg-wu-gray-400 rounded-sm p-2"}>
                        <div className={"justify-self-start pl-2"}>Scanner</div>
                        <div
                            className={`${getStatusColor(scannerStatus)} w-full h-5 rounded-full`}
                        ></div>
                    </div>
                    <div className={"w-full bg-wu-gray-400 rounded-sm p-2"}>
                        <div className={"justify-self-start pl-2"}>Backend</div>
                        <div
                            className={`${getStatusColor(scannerStatus)} w-full h-5 rounded-full`}
                        ></div>
                    </div>
                </div>
                <div
                    className={`flex flex-row gap-6 m-6 min-h-12 text-wuGrey-100 `}
                ></div>
            </div>
        </>
    );
}
