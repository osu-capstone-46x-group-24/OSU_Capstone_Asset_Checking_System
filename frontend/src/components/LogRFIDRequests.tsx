// LogRFIDRequests.tsx

import UseSocket from "../hooks/UseSocket";
import { useState } from "react";

// Input Type
type ConsoleItem = {
    reqType: string;
    itemName: string;
    timestamp: string;
    raw: string;
};

/**
 * LogRFIDRequests Componentr
 * @constructor
 */
export default function LogRFIDRequests() {
    const [consoleItems, setConsoleItems] = useState<ConsoleItem[]>([]);

    function addNetworkTransactionLog(newLog: string) {
        setConsoleItems((prev): ConsoleItem[] => [...prev, newLog]);
    }

    return (
        <>
            <div className="w-full h-full">
                <UseSocket onRequest={addNetworkTransactionLog} />
                <table className="min-w-full divide-y p-6">
                    <thead>
                        <tr className="flex justify-items-start pb-1.5 pt-1">
                            <th className="pl-15">
                                Timestamp
                            </th>
                            <th className="pl-30">
                                Request Type
                            </th>
                            <th className="pl-27">
                                Message
                            </th>
                        </tr>
                    </thead>
                    <tbody className="flex flex-col items-start">
                        {consoleItems.length === 0 ? (
                            <tr>
                                <td className="text-wu-gray-300" colSpan={1}>
                                    Transactions will appear here...
                                </td>
                            </tr>
                        ) : (
                            consoleItems.map((item: ConsoleItem, index: number) => (
                                <tr key={index} className="pt-1 pb-1 pr-1 pl-1">
                                    <td className="px-4 text-xs uppercase w-1/5">
                                        {item.timestamp}
                                    </td>
                                    <td className="px-4 text-xs uppercase w-1/5">
                                        {item.reqType}
                                    </td>
                                    <td className="px-4 text-xs uppercase w-1/5">
                                        {item.itemName}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
