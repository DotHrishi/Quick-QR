import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import qrRouter from './routes/qr.js';
import nanoRouter from './routes/nanoid.js';
import bodyParser from 'body-parser';

const PORT = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/qr', qrRouter);
app.use('/nano', nanoRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});