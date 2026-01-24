// OutboundNetworkHandler.ts

// Constants
const BACKEND_BASE: string = "http://localhost:3001/api";
const CHECK_IN: string = "/checkin";
const CHECK_OUT: string = "/checkout";
const ITEMS: string = "/items";
const ITEMS_ALL: string = ITEMS + "/all";
const ITEMS_AVAILABLE: string = ITEMS + "/available";

/**
 * Name: sendPostRequest
 *
 */
export async function sendPostRequest(endpoint: string, body?: unknown) {
    // Scanner
    // Backend
    const response = await fetch(BACKEND_BASE + endpoint, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
    });

    console.log("POST RESPONSE [", response, "]...");
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Request Failed");
    }
    return response.json();
}

/**
 * Name: sendGetRequest
 *
 */
export async function sendGetRequest(endpoint: string) {
    // Scanner
    // Backend
    const response = await fetch(BACKEND_BASE + endpoint, {
        method: "GET",
    });
    console.log("GET RESPONSE [", response, "]...");
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Request Failed");
    }
    return response.json();
}
