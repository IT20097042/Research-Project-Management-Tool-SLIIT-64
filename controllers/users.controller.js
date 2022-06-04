const User = require("../Models(db)/user.model")

const getUsers = async (req, res) => {
    try{
        const users = await User.find();

        return res.status(200).json({
            success : true,
            data : users,
            message : "User fetched Successfully"
        });
    } catch (e) {
        console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something Went Wrong"
		});
    }
}

const deleteUser = async (req,res) => {
    try{
        const user = await User.deleteOne({_id: req.params.id});
        return res.status(200).json({
            success : true,
            data : user,
            message : "User deleted Successfully"
        })
    } catch (e) {
        console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something Went Wrong"
		});
    }
}

const getUserByID = async (req,res) => {
    try{
        const user = await User.findOne({_id: req.params.id});
        return res.status(200).json({
            success : true,
            data : user,
            message : "User deleted Successfully"
        })
    } catch (e) {
        console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something Went Wrong"
		});
    }
}

const edit_user = async (req, res) => {
    try {
        User.findOne({_id: req.body.user_id}).then( user => {
            user.full_name = req.body.full_name;
            user.user_type = req.body.user_type;
            user.save();
        }).then(response => {
            return res.status(200).json({
                success: true,
                user: response,
                message: "User Edited",
            });
        });
    } catch(e){
        console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something Went Wrong"
		});
    }
}

const getPanelMembers = async (req, res) => {
    try{
        const users = await User.find({user_type: 4});

        return res.status(200).json({
            success : true,
            data : users,
            message : "Users fetched Successfully"
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
    getUsers,
    getPanelMembers,
    deleteUser,
    edit_user,
    getUserByID,
};