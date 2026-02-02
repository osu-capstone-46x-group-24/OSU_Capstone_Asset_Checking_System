import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const PORT = process.env.PORT || 3000;

// more mock cards could be added in the future,
// currently I only have one working card
const RFID_CARDS: string[] = ['00:00:00:20:04:aa:c7:ff'];

const MOCK_ITEMS: string[] = [
    '00:80:61:3e:89:1c:b4:04',
    '00:80:61:3e:8a:3e:63:04',
    '00:80:61:3e:81:bb:e9:04',
    '00:80:61:3e:89:36:75:04',
    '00:80:61:3e:82:1c:84:04',
];

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/api/scanner/cards', (req, res) => {
    let cardId: string;
    if (!req.body) {
        cardId = RFID_CARDS[Math.floor(Math.random() * RFID_CARDS.length)];
    } else {
        cardId = req.body.data;
    }
    console.log('Sending card ID:', cardId);
    io.emit('card', cardId);
    res.json({ status: 'sent', cardId });
});

app.post('/api/scanner/items', (req, res) => {
    let itemId: string;
    if (!req.body) {
        itemId = MOCK_ITEMS[Math.floor(Math.random() * MOCK_ITEMS.length)];
    } else {
        itemId = req.body.data;
    }
    console.log('Sending item ID:', itemId);
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
