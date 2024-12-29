// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const cors = require('cors');
const Paste = require('./models/Pastebin');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mrwhoisamit:vDkLlQEa6Gtft0ai@cluster0.jlrtl.mongodb.net/pastebin_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// API Routes

// Create a new paste
app.get("/", function (req, res) {
    res.send("hello world")
})
app.post('/paste', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        const shortUrl = shortid.generate();
        const paste = new Paste({ content, shortUrl });
        await paste.save();

        res.status(201).json({ shortUrl });
    } catch (err) {
        res.status(500).json({ error: 'Server Error', details: err.message });
    }
});

// Retrieve a paste by short URL
app.get('/paste/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const paste = await Paste.findOne({ shortUrl });

        if (!paste) {
            return res.status(404).json({ error: 'Paste not found' });
        }

        res.status(200).json({ content: paste.content });
    } catch (err) {
        res.status(500).json({ error: 'Server Error', details: err.message });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
