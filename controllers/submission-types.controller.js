const SubmissionTypes = require("../models/submission-types.model");

const getSubmissionTypes = async (req, res) => {
    try{
        const submissionTypes = await SubmissionTypes.find();

        return res.status(200).json({
            success : true,
            data : submissionTypes,
            message : "submission types fetched Successfully"
        });
    } catch (e) {
        console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something Went Wrong"
		});
    }
};

const addSubmissionType = async (req, res) => {
    try{
        let newSubmissionType = new SubmissionTypes({
            type: req.body.type,
        });

        const savedSubmissionType = await newSubmissionType.save();

        return res.status(200).json({
            success : true,
            data : savedSubmissionType,
            message : "submission type added successfully"
        });
    } catch (e) {
        console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something Went Wrong"
		});
    }

};

module.exports = {
    getSubmissionTypes,
    addSubmissionType
};