const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AssignmentSchema = new Schema({

    course:{
        type:String,
    },
    assignment_name:{
        type:String
    },
    deadline:{
        type:String,
    },

    date:{
        type:Date,
        default:Date.now()
    }
},{
    collection :'assignments'
});

//now we have to export this,

module.exports = mongoose.model('Assignment', AssignmentSchema);