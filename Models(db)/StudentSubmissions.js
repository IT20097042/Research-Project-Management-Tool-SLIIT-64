const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let StudentSubmissionsSchema = new Schema({
    Submission_File_Path :{
        type:String
    },
    File_Name:{
        type: String,
    },
    Group_Name :{
        type: String,

    },
    Marks:{
        type:String,
        default: 'Not Evaluated'
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = StudentSubmissions = mongoose.model('studentsubmissions', StudentSubmissionsSchema)