const User = require("../models/user.model");
const ChatMessage = require("../models/chat-message.model");
const ProjectGroup = require("../models/project-group.model");
const ProjectGroupUserMap = require("../models/project-group-user-map.model");

const { USER_TYPE, STATUS_TYPE, REQUEST_TYPE } = require('../constants/constant');

const add = async (req, res) => {
	try {
		if (!req.body || !req.body.project || !req.body.message) {
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
		}

		let newChatMessage = new ChatMessage({
			project: req.body.project,
			message: req.body.message,
			created_on: new Date(),
			created_by: req.userInfo.id
		});
		
		const savedChatMessage = await newChatMessage.save();

		return res.json({
			success: true,
			message: "Message sent successfully",
			request: savedChatMessage
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Please contact administrator"
		});
	}
};

const getAllChatGroupsForSupervisor = async (req, res) => {
	try {
		let groups = await ProjectGroup.find({$or:[{ supervisor: req.userInfo.id },{co_supervisor: req.userInfo.id}]});

		if (!groups) {
			return res.status(404).json({
				success: false,
				message: "Data not found"
			});
		}

		return res.json({
			success: true,
			message: "Chat Groups fetched successfully",
			data: groups
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Please contact administrator"
		});
	}
};

const getAllMessagesUsingGroupId = async (req, res) => {
	try {
		if (!req.params.project) {
			return res.status(401).json({
				success: false,
				message: 'Invalid input data'
			});
		}

		let messages = await ChatMessage.find({ project: req.params.project });

		if (!messages) {
			return res.status(404).json({
				success: false,
				message: "Data not found"
			});
		}

		const result = await Promise.all(messages.map(async i => {
			let newData = i._doc;
			newData.isLoggedUser = i.created_by == req.userInfo.id;
			return newData;
		}));

		return res.json({
			success: true,
			message: "Messages fetched successfully",
			data: result
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
	getAllChatGroupsForSupervisor,
	getAllMessagesUsingGroupId
};