const User = require("../models/user.model");
const Request = require("../models/request.model");
const ProjectGroup = require("../models/project-group.model");
const ProjectGroupUserMap = require("../models/project-group-user-map.model");
const { USER_TYPE, STATUS_TYPE, REQUEST_TYPE } = require('../constants/constant');

const add = async (req, res) => {
	try {
		if (!req.body || !req.body.project || !req.body.request_type || !req.body.assign_to) {
			return res.status(400).json({
				success: false,
				message: "Invalid data input"
			});
		}

		const project = await ProjectGroup.findOne({ _id: req.body.project });

		if (!project) {
			return res.status(400).json({
				success: false,
				message: "Project not found"
			});
		} else if (!project.is_active || project.is_deleted || project.status == STATUS_TYPE.REJECTED) {
			return res.status(400).json({
				success: false,
				message: "Project is not available or rejected"
			});
		}

		const assignTo = await User.findOne({ _id: req.body.assign_to, user_type: USER_TYPE.SUPERVISOR });

		if (!assignTo) {
			return res.status(400).json({
				success: false,
				message: "Supervisor not found"
			});
		} else if (assignTo.research_area == project.research_area) {
			return res.status(400).json({
				success: false,
				message: "Supervisor research area is not matching for project"
			});
		}

		let newRequest = new Request({
			project: req.body.project,
			status: STATUS_TYPE.WAITING_FOR_APPROVAL,
			request_type: req.body.request_type,
			assign_to: req.body.assign_to,
			is_deleted: false,
			created_by: req.userInfo.id
		});
		
		const savedRequest = await newRequest.save();

		return res.json({
			success: true,
			message: "Request saved successfully",
			request: savedRequest
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Please contact administrator"
		});
	}
};

const getAllTopicsForSupervisor = async (req, res) => {
	try {
		const supervisorId = req.userInfo.id;
		const userType = req.userInfo.user_type;

		if (userType != USER_TYPE.SUPERVISOR) {
			return res.status(401).json({
				success: false,
				message: 'Access Denied'
			});
		}

		let requests = await Request.find({ 
			status: STATUS_TYPE.WAITING_FOR_APPROVAL,
			assign_to: supervisorId,
			is_deleted: false
		});

		if (!requests) {
			return res.status(404).json({
				success: false,
				message: "Data not found"
			});
		}

		const result = await Promise.all(requests.map(async i => {
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
			message: "Requests fetched successfully",
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

const getAllTopicsForPanel = async (req, res) => {
	try {
		const supervisorId = req.userInfo.id;
		const userType = req.userInfo.user_type;

		if (userType != USER_TYPE.PANEL_MEMBER) {
			return res.status(401).json({
				success: false,
				message: 'Access Denied'
			});
		}

		let requests = await Request.find({ 
			status: STATUS_TYPE.WAITING_FOR_APPROVAL,
			assign_to: supervisorId,
			is_deleted: false
		});

		if (!requests) {
			return res.status(404).json({
				success: false,
				message: "Data not found"
			});
		}

		const result = await Promise.all(requests.map(async i => {
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
			message: "Requests fetched successfully",
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

const evaluateRequest = async (req, res) => {
	try {
		if (!req.body || !req.body.status || !req.body.requestId) {
			return res.status(400).json({
				success: false,
				message: "Invalid data input"
			});
		} else if (req.userInfo.user_type == USER_TYPE.PANEL_MEMBER && !req.body.message) {
			return res.status(400).json({
				success: false,
				message: "Invalid data input"
			});
		}

		let request = await Request.findOne({ _id: req.body.requestId });

		if (!request) {
			return res.status(404).json({
				success: false,
				message: "Request not found"
			});
		} else if (request.status == STATUS_TYPE.ACCEPTED) {
			return res.status(404).json({
				success: false,
				message: "Request is already accepted"
			});
		} else if (request.status == STATUS_TYPE.REJECTED) {
			return res.status(404).json({
				success: false,
				message: "Request is rejected"
			});
		} else if (request.assign_to != req.userInfo.id) {
			return res.status(404).json({
				success: false,
				message: "Request is not assigned to this user"
			});
		}

		request.comments = req.body.message;
		request.status = req.body.status;
		request.modified_by = req.userInfo.id;
		await request.save();

		return res.json({
			success: true,
			message: "Request updated successfully"
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Please contact administrator"
		});
	}
};

module.exports = {
	add,
	evaluateRequest,
	getAllTopicsForSupervisor,
	getAllTopicsForPanel
};