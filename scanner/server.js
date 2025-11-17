import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = 3000;

const RFID_CARDS = [
  '@05607858',
  '@07190903',
  '@03505228',
  '@04740860',
  '@02249897',
];

const MOCK_ITEMS = [
  'T0001',
  'T0003',
  'T0012',
  'T0022',
  'T0034',
  'T0099',
  'T0115',
];

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/api/scanner/cards', (req, res) => {
  const cardId = RFID_CARDS[Math.floor(Math.random() * RFID_CARDS.length)];
  io.emit('card', cardId);
  res.json({ status: 'sent', cardId });
});

app.post('/api/scanner/items', (req, res) => {
  const itemId = MOCK_ITEMS[Math.floor(Math.random() * MOCK_ITEMS.length)];
  io.emit('item', itemId);
  res.json({ status: 'sent', itemId });
});

io.on('connection', (socket) => {
  console.log('connected');
  io.emit('message', 'Connected');
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
