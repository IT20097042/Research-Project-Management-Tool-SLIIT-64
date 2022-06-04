const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models(db)/user.model");
const { JWT_TOKEN } = require('../constants/constant');

const signup = async (req, res) => {
	try {
		if (!req.body || !req.body.full_name || !req.body.student_id || !req.body.password ||
			!req.body.user_type || req.body.user_type <= 0 || (req.body.user_type == 3 && (
				!req.body.research_area || req.body.research_area <= 0
			)) || (req.body.user_type != 2 && req.body.user_type != 3)
		) {
			return res.status(400).json({
				success: false,
				message: "Invalid data input"
			});
		}

		const user = await User.findOne({ student_id: req.body.student_id });

		if (user) {
			return res.status(400).json({
				success: false,
				message: "Student Id already exists"
			});
		}

		let newUser = new User({
			full_name: req.body.full_name,
			student_id: req.body.student_id,
			email: req.body.email,
			password: req.body.password,
			research_area: req.body.research_area,
			user_type: req.body.user_type
		});

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(newUser.password, salt);

		newUser.password = hashedPassword;
		const savedUser = await newUser.save();

		return res.json({
			success: true,
			message: "User registered successfully",
			user: savedUser
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Please contact administrator"
		});
	}
};

const signin = async (req, res) => {
	try {
		if (!req.body || !req.body.student_id || !req.body.password) {
			return res.status(400).json({
				success: false,
				message: "Invalid data input"
			});
		}

		const studentId = req.body.student_id;
		const password = req.body.password;

		let user = await User.findOne({ student_id: studentId });

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found. Please Signup and Try again!"
			});
		}

		const isMatchPassword = bcrypt.compareSync(password, user.password);

		if (!isMatchPassword) {
			return res.status(400).json({
				success: false,
				message: "Student id or password incorrect"
			});
		}

		const data = {
			id: user._id,
			email: user.student_id,
			user_type: user.user_type
		};

		const token = await jwt.sign(data, JWT_TOKEN, { expiresIn: 63113852 });

		delete user.password;

		return res.json({
			success: true,
			message: "User signed in successfully",
			user: {
				id: user._id,
				full_name: user.full_name,
				student_id: user.student_id,
				email: user.email,
				user_type: user.user_type
			},
			token: token
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Please contact administrator"
		});
	}
};

module.exports = {
	signup,
	signin
};