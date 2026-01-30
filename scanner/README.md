# Scanner Websocket Documentation

The system uses socket.io sockets for live card and item scans. Currently this
is a mock implementation, but should model a decent amount of the functionality.

The node server is the functional part of this program, the client part is for
demo purposes (so you can see how to implement it in the dashboard) and
controlling the mock endpoints.

## How it works

The node backend will intercept inputs from the scanner and emit events for
`card` and `item` events whenever a scan of that type happens. You can listen
for these events independantly like this on the frontend:

```js
const socket = io();

socket.on('card', (cardId) => {
    console.log(cardId);
});
```

Listening for events like this can let you control how the frontend flows and
what happens when things are scanned. For example, you can wait to start a flow
until you get a card scan event, and while in a flow you can ignore them.

## Mock Client

Since we don't have a scanner yet, and you likely wont have the scanner for
development since we only have one, I've created a mock client for triggering
scans. I've created 2 endpoints:

- `POST /api/scanner/cards` - simulates card scan
- `POST /api/scanner/items` - simulates item scan

Once the server is running, you can open the `index.html` in this folder in your
browser and click the buttons to trigger scans. Below the buttons you can see a
scan log of the items, so you can validate the data in the socket.

## Running the server

To run the websocket server, first install the packages needed:

```
npm install
```

Then, start the server (make sure ports arent conflicting) with:

```
node server.js
```
