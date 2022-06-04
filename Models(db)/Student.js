//adding students attributes and create a model that can be connected to mongodb
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({

    firstName:{
        type:String,
        //white space is trimmed off the end
        trim: true,
    },
    lastName:{
        //white space is trimmed off the end
        trim: true,
        type:String,
    },
    email:{
        type:String,
        //required true means it is compulsory to enter the email.
        required:true,
        //white space is trimmed off the end
        trim: true,
    },
    password :{
        type:String,
        required: true,
        //white space is trimmed off the end
        trim: true,
    },
    status: {
        type: String,
        trim: true,
        default: "Pending"
    },
    group_id: {
        type: String,
        trim: true,
    },
    date:{
        type:Date,
        //to take the current type
        default:Date.now()
    }
});

//now we have to export this,
//students is the collection name in mongoDB.
module.exports= Student = mongoose.model('students', StudentSchema);