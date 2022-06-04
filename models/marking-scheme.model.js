const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarkingSchemeSchema = new Schema({
    description:{
        type: String
    },
    marking:[
        {
            description:{
                type: String
            },
            allocated_mark:{
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('marking_schemes', MarkingSchemeSchema);