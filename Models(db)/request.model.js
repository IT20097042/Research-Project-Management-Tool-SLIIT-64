const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
	project: {
		type: ObjectId,
		required: true
	},
	status: {
		type: Number,
		required: true
	},
	comments: {
		type: String
	},
	request_type: {
		type: Number,
		required: true
	},
	assign_to: {
		type: ObjectId,
		required: true
	},
	is_deleted: {
		type: Boolean,
		default: false
	},
	modified_by: {
		type: ObjectId
	},
	created_by: {
		type: ObjectId,
		required: true
	}
});

module.exports = mongoose.model('request', RequestSchema);