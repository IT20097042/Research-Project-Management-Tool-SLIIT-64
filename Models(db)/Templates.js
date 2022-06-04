const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TemplateSchema = new Schema({
    Template_File_Path:{
        type:String,
        trim: true
    },
    Template_Name:{
        type:String,
        trim: true
    }

})

module.exports = Templates = mongoose.model('templates', TemplateSchema)