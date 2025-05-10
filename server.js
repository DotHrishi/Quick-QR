import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from 'path';

const PORT=3000;
const app=express();
const __dirname=dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
