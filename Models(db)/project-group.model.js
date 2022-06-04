const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const ProjectGroupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    research_area: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    supervisor: {
        type: ObjectId,
        required: true
    },
    co_supervisor: {
        type: ObjectId
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    created_by: {
        type: ObjectId,
        required: true
    },
    modified_by: {
        type: ObjectId
    },
});

module.exports = mongoose.model("project_group", ProjectGroupSchema);