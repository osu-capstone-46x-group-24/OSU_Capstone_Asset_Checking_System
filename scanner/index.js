const BASE_URL = `http://localhost:3000`;

const socket = io(BASE_URL);

// POST to the scanner cards endpoint
document.getElementById('scan-card').onclick = () => {
    fetch(`${BASE_URL}/api/scanner/cards`, { method: 'POST' });
};

// POST to the scanner items endpoint
document.getElementById('scan-item').onclick = () => {
    fetch(`${BASE_URL}/api/scanner/items`, { method: 'POST' });
};

// GET scanner status
document.getElementById('get-status').onclick = () => {
    fetch(`${BASE_URL}/api/scanner/status`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            addToLog(`Scanner status: ${JSON.stringify(data)}`);
        });
};

function addToLog(text) {
    const log = document.getElementById('scan-log');
    const entry = document.createElement('p');
    entry.textContent = text;
    log.appendChild(entry);
}

// listen for socket events
socket.on('message', (msg) => {
    addToLog(`Message from server: ${msg}`);
});

socket.on('card', (cardId) => {
    addToLog(`Card scanned: ${cardId}`);
});

socket.on('item', (itemId) => {
    addToLog(`Item scanned: ${itemId}`);
});

socket.on('status', (status) => {
    addToLog(`Scanner status: ${JSON.stringify(status)}`);
});
