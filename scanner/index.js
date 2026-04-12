const BASE_URL = `http://localhost:3003`;

const socket = io(BASE_URL);

// POST to the scanner cards endpoint
document.getElementById('scan-admin-card').onclick = () => {
    fetch(`${BASE_URL}/api/scanner/cards`, {
        method: 'POST',
        body: JSON.stringify({ data: '00:00:00:20:04:aa:c7:ff' }),
    });
};

// POST to the scanner user card endpoint
document.getElementById('scan-user-card').onclick = () => {
    fetch(`${BASE_URL}/api/scanner/cards`, {
        method: 'POST',
        body: JSON.stringify({ data: '00:00:00:2c:e9:86:0c:de' }),
    });
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
