const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
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
	submission_type: {
		type: Number,
		required: true
	},
	file_name: {
		type: String,
		required: true
	},
	file_link: {
		type: String,
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

module.exports = mongoose.model('submission', SubmissionSchema);