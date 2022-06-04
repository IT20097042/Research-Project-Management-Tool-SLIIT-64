const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	full_name: {
		type: String,
		required: true
	},
	student_id: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	password: {
		type: String,
		required: true
	},
	research_area: {
		type: Number
	},
	user_type: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('user', UserSchema);