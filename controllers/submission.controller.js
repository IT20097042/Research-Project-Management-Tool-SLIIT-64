const User = require("../models/user.model");
const Submission = require("../models/submission.model");
const ProjectGroup = require("../models/project-group.model");
const { USER_TYPE, STATUS_TYPE, REQUEST_TYPE } = require('../constants/constant');

const evaluateSubmission = async (req, res) => {
	try {
		if (!req.body || !req.body.status || !req.body.message || !req.body.submissionId) {
			return res.status(400).json({
				success: false,
				message: "Invalid data input"
			});
		}

		let submission = await Submission.findOne({ _id: req.body.submissionId });

		if (!submission) {
			return res.status(404).json({
				success: false,
				message: "Submission not found"
			});
		} else if (submission.status == STATUS_TYPE.ACCEPTED) {
			return res.status(404).json({
				success: false,
				message: "Submission is already accepted"
			});
		} else if (submission.status == STATUS_TYPE.REJECTED) {
			return res.status(404).json({
				success: false,
				message: "Submission is rejected"
			});
		} else if (submission.assign_to != req.userInfo.id) {
			return res.status(404).json({
				success: false,
				message: "Submission is not assigned to this user"
			});
		}

		submission.comments = req.body.message;
		submission.status = req.body.status;
		submission.modified_by = req.userInfo.id;
		await submission.save();

		return res.json({
			success: true,
			message: "Submission updated successfully"
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Please contact administrator"
		});
	}
};

const getAllSubmissionsForSupervisor = async (req, res) => {
	try {
		const supervisorId = req.userInfo.id;
		const userType = req.userInfo.user_type;

		if (userType != USER_TYPE.SUPERVISOR) {
			return res.status(401).json({
				success: false,
				message: 'Access Denied'
			});
		}

		let submissions = await Submission.find({ 
			status: STATUS_TYPE.WAITING_FOR_APPROVAL,
			assign_to: supervisorId,
			is_deleted: false
		});

		if (!submissions) {
			return res.status(404).json({
				success: false,
				message: "Data not found"
			});
		}

		const result = await Promise.all(submissions.map(async i => {
			let newData = i._doc;

			const project = await ProjectGroup.findOne({ _id: i.project });

			if (!project) {
				return res.status(404).json({
					success: false,
					message: "Data not found"
				});
			}
			newData.project = project;

			const leader = await User.findOne({ _id: i.created_by });

			if (!leader) {
				return res.status(404).json({
					success: false,
					message: "Data not found"
				});
			}
			newData.leader = leader;
			return newData;
		}));

		return res.json({
			success: true,
			message: "Submissions fetched successfully",
			data: result
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "Please contact administrator"
		});
	}
};

const getAllSubmissionsForPanel = async (req, res) => {
	try {
		const supervisorId = req.userInfo.id;
		const userType = req.userInfo.user_type;

		if (userType != USER_TYPE.PANEL_MEMBER) {
			return res.status(401).json({
				success: false,
				message: 'Access Denied'
			});
		}

		let submissions = await Submission.find({ 
			status: STATUS_TYPE.WAITING_FOR_APPROVAL,
			assign_to: supervisorId,
			is_deleted: false
		});

		if (!submissions) {
			return res.status(404).json({
				success: false,
				message: "Data not found"
			});
		}

		const result = await Promise.all(submissions.map(async i => {
			let newData = i._doc;

			const project = await ProjectGroup.findOne({ _id: i.project });

			if (!project) {
				return res.status(404).json({
					success: false,
					message: "Data not found"
				});
			}
			newData.project = project;

			const leader = await User.findOne({ _id: i.created_by });

			if (!leader) {
				return res.status(404).json({
					success: false,
					message: "Data not found"
				});
			}
			newData.leader = leader;
			return newData;
		}));

		return res.json({
			success: true,
			message: "Submissions fetched successfully",
			data: result
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "Please contact administrator"
		});
	}
};

module.exports = {
	evaluateSubmission,
	getAllSubmissionsForSupervisor,
	getAllSubmissionsForPanel
};