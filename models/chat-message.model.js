const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
	project: {
		type: ObjectId,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	created_on: {
		type: Date,
		required: true,
	},
	created_by: {
		type: ObjectId,
		required: true,
	}
});

module.exports = mongoose.model("chat_message", ChatMessageSchema);
