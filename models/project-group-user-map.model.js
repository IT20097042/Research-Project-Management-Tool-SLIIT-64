const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const ProjectGroupUserMapSchema = new mongoose.Schema({
    project_group: {
        type: ObjectId,
        required: true
    },
    user: {
        type: ObjectId,
        required: true
    },
});

module.exports = mongoose.model('project_group_user_map', ProjectGroupUserMapSchema);