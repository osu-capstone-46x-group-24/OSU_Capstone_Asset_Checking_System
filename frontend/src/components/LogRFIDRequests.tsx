// LogRFIDRequests.tsx

import {useCallback, useEffect, useRef, useState} from "react";
import configJson from "../spec_config.json";
import UseSocket from "../hooks/UseSocket";

// Input Type
type ConsoleItem = {
    reqType: string;
    sender: string;
    itemName: string;
    timestamp: string;
    raw: string;
};

const color_placeholder_text = "wu-gray-300";

/**
 * LogRFIDRequests
 * @type Component
 * @constructor
 */
export default function LogRFIDRequests({
    color_primary_text,
    color_primary_bg,
    color_accent_text,
    color_accent_bg,
}: {
    color_primary_text: string;
    color_primary_bg: string,
    color_accent_text: string,
    color_accent_bg: string
}) {
    const [consoleItems, setConsoleItems] = useState<ConsoleItem[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const addNetworkTransactionLog = useCallback((newLog: ConsoleItem) => {
        setConsoleItems(prev => [...prev, newLog]);
    }, []);

    // Color-code message types *based on spec_config.json file
    function getReqTypeColor(reqType: string) {
        if (reqType == "message") {
            return (configJson.theme.color.request.message);
        } else if (reqType == "item") {
            return (configJson.theme.color.request.item);
        } else if (reqType == "card") {
            return (configJson.theme.color.request.card);
        } else {
            return ("text-wu-gray-200");
        }
    }

    // Auto scroll console on new entry
    useEffect(() => {
        const e1 = containerRef.current;
        if (!e1) return;

        e1.scrollTop = e1.scrollHeight;
    }, [consoleItems]);

    // Call UseSocket
    UseSocket(addNetworkTransactionLog);

    return (
        <>
            <div
                className={`h-[600px] overflow-y-auto mb-8 rounded-sm shadow-lg bg-${color_primary_bg}`}
                ref={containerRef}
            >
                <table className="divide-y mb-6 text-left">
                    <thead className={`sticky top-1 bg-${color_accent_bg} shadow-sm text-center py-1 text-${color_accent_text}`}>
                        <tr className={`w-min`}>
                            <th className="px-4 whitespace-nowrap">Timestamp</th>
                            <th className="px-4 whitespace-nowrap">Sender</th>
                            <th className="px-4 whitespace-nowrap">Request Type</th>
                            <th className="px-4 whitespace-nowrap">Message</th>
                            <th className="w-full"></th>
                        </tr>
                    </thead>
                    <tbody className={`pt-[32px] text-${color_primary_text}`}>
                        {consoleItems.length === 0 ? (
                            <tr>
                                <td
                                    className={`text-${color_placeholder_text} px-4 py-2`}
                                    colSpan={1}
                                >
                                    Transactions will appear here...
                                </td>
                            </tr>
                        ) : (
                            consoleItems.map(
                                (item: ConsoleItem, index: number) => (
                                    <tr
                                        key={index}
                                        className={`border-b text-center border-dashed border-${color_primary_text} nth-[2n]:border-wu-gray-300 text-xs uppercase`}
                                    >
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            [{item.timestamp}]
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap"
                                        >{item.sender}</td>
                                        <td className={`px-4 py-2 whitespace-nowrap 
                                        ${getReqTypeColor(item.reqType)}`}>
                                            {item.reqType}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap">
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
