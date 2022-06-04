const MarkingScheme = require('../Models(db)/marking-scheme.model');

const createMarkingScheme = async (req, res) => {
    try{
        let newMarkingScheme = new MarkingScheme({
            description: req.body.description,
            marking: req.body.marking,
        });

        const savedMarkingSheme = await newMarkingScheme.save();

        return res.status(200).json({
            success : true,
            data : savedMarkingSheme,
            message : "Marking Scheme added successfully",
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
    createMarkingScheme,
}