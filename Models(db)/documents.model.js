const mongoose = require('mongoose');

const DocumentShema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('documents', DocumentShema);