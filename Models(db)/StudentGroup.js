//adding students attributes and create a model that can be connected to mongodb
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentGroupSchema = new Schema({

    groupName:{
        type:String,
        //white space is trimmed off the end
        trim: true,
        required: true
    },

    researchTopic_Data: [{

        research_Topic: {
            type: String,
            //require: true
        },
        research_Topic_Status: {
            type: String,
            default: "Pending"
            //require: true
        },
        field: {
            type: String,
            //required: true
        }
    }],

    groupMembers: [{
        _id: {
            type: String,
            ref: "students"
        },

        student_id: {
            type: String,
            //require: true
        },
        name: {
            type: String,
            //required: true
        },
        email: {
            type: String,
            //required: true
        },
        phone: {
            type: String,
            required: false
        }
    }],
});

//now we have to export this,
//students is the collection name in mongoDB.
module.exports= StudentGroup = mongoose.model('StudentGroups', StudentGroupSchema);