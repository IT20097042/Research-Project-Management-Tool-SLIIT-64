const Documents = require("../models/documents.model");

const uploadDocument = async (req, res) =>  {
    try{
        let newDocument = new Documents({
            description: req.body.description,
            document: req.file.originalname
        });

        const savedDocument = await newDocument.save();

        return res.status(200).json({
            success : true,
            data : savedDocument,
            message : "submission type added successfully"
        });
    } catch (e) {
        console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something Went Wrong"
		});
    }

}

const getAllDocuments = async (req, res) =>  {
    try{


        var documents = await Documents.find();

        return res.status(200).json({
            success : true,
            data : documents,
            message : "submission type added successfully"
        });
    } catch (e) {
        console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something Went Wrong"
		});
    }

}

module.exports = {
    uploadDocument,
    getAllDocuments
}