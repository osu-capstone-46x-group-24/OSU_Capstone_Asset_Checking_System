// LogRequestConsole.tsx

// Imports
import { useEffect, useRef } from "react";
import configJson from "../spec_config.json";

// Types
type NetworkLogItem = {
    reqType: string;
    sender: string;
    destination: string;
    itemName: string;
    timestamp: string;
    httpType: string;
    endpoint: string;
};

type LogRequestConsoleProps = {
    color_primary_text: string;
    color_primary_bg: string;
    color_accent_text: string;
    color_accent_bg: string;
    networkLogItems: NetworkLogItem[];
};

// Constants
const color_placeholder_text = "wu-gray-300";

/**
 * Name: LogRequestConsole
 * Type: Component
 * Description: Takes styling properties as props and displays a console that displays incoming requests caught via the UseSocket.tsx hook
 * Props: color_primary_text, color_primary_bg, color_accent_text, color_accent_bg
 */
export default function LogRequestConsole({
    color_primary_text,
    color_primary_bg,
    color_accent_text,
    color_accent_bg,
    networkLogItems,
}: LogRequestConsoleProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    // const addNetworkTransactionLog = useCallback((newLog: NetworkLogItem) => {
    //     setConsoleItems((prev) => [...prev, newLog]);
    // }, []);

    // Color-code message types *based on spec_config.json file
    function getReqTypeColor(reqType: string) {
        if (reqType == "message") {
            return configJson.theme.color.request.message;
        } else if (reqType == "item") {
            return configJson.theme.color.request.item;
        } else if (reqType == "card") {
            return configJson.theme.color.request.card;
        } else {
            return "text-wu-gray-200";
        }
    }

    // Auto scroll console on new entry
    useEffect(() => {
        const e1 = containerRef.current;
        if (!e1) return;

        e1.scrollTop = e1.scrollHeight;
    }, [networkLogItems]);

    return (
        <>
            <div
                className={`h-[600px] overflow-y-auto mb-8 rounded-sm shadow-lg bg-${color_primary_bg}`}
                ref={containerRef}
            >
                <table className="divide-y mb-6 m-1 text-left">
                    <thead
                        className={`sticky top-1 text-center p-1 text-${color_accent_text}`}
                    >
                        <tr className={`w-min bg-${color_accent_bg}`}>
                            <th className="px-4 whitespace-nowrap">
                                Timestamp
                            </th>
                            <th className="px-4 whitespace-nowrap">Sender</th>
                            <th className="px-4 whitespace-nowrap">
                                Destination
                            </th>
                            <th className="px-4 whitespace-nowrap">Endpoint</th>
                            <th className="px-4 whitespace-nowrap">Request</th>
                            <th className="px-4 whitespace-nowrap">Type</th>
                            <th className="px-4 whitespace-nowrap">Message</th>
                            <th className="w-full"></th>
                        </tr>
                    </thead>
                    <tbody
                        className={`pt-[32px] min-w-full text-${color_primary_text}`}
                    >
                        {networkLogItems.length === 0 ? (
                            <tr>
                                <td
                                    className={`text-${color_placeholder_text} px-4 py-2`}
                                    colSpan={4}
                                >
                                    Transactions will appear here...
                                </td>
                            </tr>
                        ) : (
                            networkLogItems.map(
                                (item: NetworkLogItem, index: number) => (
                                    <tr
                                        key={index}
                                        className={`border-b text-center border-dashed border-${color_primary_text} nth-[2n]:border-wu-gray-300 text-xs uppercase`}
                                    >
                                        <td
                                            className="px-4 py-2 whitespace-nowrap"
                                            colSpan={1}
                                        >
                                            [{item.timestamp}]
                                        </td>
                                        <td
                                            className="px-4 py-2 whitespace-nowrap"
                                            colSpan={1}
                                        >
                                            {item.sender}
                                        </td>
                                        <td
                                            className="px-4 py-2 whitespace-nowrap"
                                            colSpan={1}
                                        >
                                            {item.destination}
                                        </td>
                                        <td
                                            className="px-4 py-2 whitespace-nowrap"
                                            colSpan={1}
                                        >
                                            {item.endpoint}
                                        </td>
                                        <td
                                            className={`px-4 py-2 whitespace-nowrap 
                                            ${getReqTypeColor(item.reqType)}`}
                                            colSpan={1}
                                        >
                                            {item.reqType}
                                        </td>
                                        <td
                                            className="px-4 py-2 whitespace-nowrap"
                                            colSpan={1}
                                        >
                                            {item.httpType}
                                        </td>
                                        <td
                                            className="px-4 py-2 whitespace-nowrap"
                                            colSpan={1}
                                        >
                                            {item.itemName}
                                        </td>
                                        <td className="px-[1px] w-full"></td>
                                    </tr>
                                )
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
