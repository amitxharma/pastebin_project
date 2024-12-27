// models/Paste.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Paste schema
const pasteSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d', // Expire after 7 days (optional)
    },
});

module.exports = mongoose.model('Paste', pasteSchema);
