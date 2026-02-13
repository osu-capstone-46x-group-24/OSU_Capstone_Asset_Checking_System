const PORT = 3003;
const BASE_URL = `http://localhost:${PORT}`;

const socket = io(BASE_URL);

// POST to the scanner cards endpoint
document.getElementById('scan-card').onclick = () => {
  fetch(`${BASE_URL}/api/scanner/cards`, { method: 'POST' });
};

// POST to the scanner items endpoint
document.getElementById('scan-item').onclick = () => {
  fetch(`${BASE_URL}/api/scanner/items`, { method: 'POST' });
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
