const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const SubmissionTypesSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('submission_types', SubmissionTypesSchema);