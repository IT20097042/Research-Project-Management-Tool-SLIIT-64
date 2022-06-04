const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSupervisorSchema = new Schema({
    groupID : {
        type: String,
    },
    groupName : {
        type: String,

    },
    research_Topic : {
      type : String,

    },
    field : {
        type : String,

    },
    supervisor:{
        type : String,
        default :'pending'

    },
    co_supervisor:{
        type : String,
        default :'pending'
}
});

module.exports= RequestSupervisor = mongoose.model('requestsupervisor', RequestSupervisorSchema)