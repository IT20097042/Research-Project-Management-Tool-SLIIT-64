const StudentGroups = require("../models/student-groups.model")

const allocatePanelMember = async (req, res) => {
    try {

        var a = StudentGroups.updateOne({_id: req.body.group_id}, {$push: {panelMembers:[{_id: req.body.panel_member}]}});
        
        a.exec()

        return res.status(200).json({
            success: true,
            
            message: "Panel Member Allocated",
        });
    } catch(e){
        console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something Went Wrong"
		});
    }
}

module.exports = {
    allocatePanelMember,
};