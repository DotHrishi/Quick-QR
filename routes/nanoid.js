import express from 'express';
import { nanoid } from 'nanoid';

const router = express.Router();

// In-memory store for nanolinks (use a database in production)
const nanolinks = new Map();

// Generate nanolink
router.post('/generate', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    try {
        const id = nanoid(10);
        const nanolink = `http://localhost:3000/nano/${id}`;
        nanolinks.set(id, url);
        res.json({ nanolink });
    } catch (err) {
        res.status(500).json({ error: 'Nanolink generation failed' });
    }
});

// Redirect nanolink to original URL
router.get('/:id', (req, res) => {
    const url = nanolinks.get(req.params.id);
    if (url) {
        res.redirect(url);
    } else {
        res.status(404).send('Nanolink not found');
    }
});

export default router;