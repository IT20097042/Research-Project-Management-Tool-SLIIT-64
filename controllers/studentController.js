const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const asyncHandler = require ('express-async-handler')
const User = require('../Models(db)/Student')
const {json} = require("express");
const Student = require("../Models(db)/Student");
const Group = require("../Models(db)/StudentGroup");
const Templates = require("../Models(db)/Templates")
const RequestSupervisor = require("../Models(db)/RequestSupervisor")
const path = require("express");



//Generate JWT
const generateToken = (id, firstName, lastName, email) =>{
    return jwt.sign({id, firstName, lastName, email }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const registerStudent = asyncHandler(async (req, res) => {


    //const today = new Date();
    // const studentData ={
    //     //entering the data according to the data in the request body
    //     firstName : req.body.firstName,
    //     lastName : req.body.lastName,
    //     email : req.body.email,
    //     password: req.body.password,
    //     created : today
    // }
    const{firstName, lastName, email, password} = req.body
    if( !firstName || !lastName || !email || ! password){
        res.status(400)
        console.log(`${firstName} ${lastName} ${email} ${password} `)
        throw new Error('Please add all fields name , email, password')
    }

    //we have to find the student

    const userExist = await  Student.findOne({email})

    if(userExist){
        res.status(400).json({
            success: false,
            message :`${email} already exist `})

        // throw new Error(`${email} already exist `)

    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword  = await bcrypt.hash(password, salt);

    const student = await Student.create({
            firstName,
            lastName,
            email,
            password : hashedPassword
        }
    )
    if(student) {
        res.status(201).json({
            success: true,
            message :`User Successfully Registered!! `,
            _id:student.id,
            firstName:student.firstName,
            lastName:student.lastName,
            email:student.email,
            password:student.password,
            token: generateToken(student.id, student.firstName , student.lastName, student.email)


        })

    }
    else{
        res.status(400)
        throw new Error('Invalid User data')
    }


})

const loginStudent = asyncHandler(async (req, res) =>{
    const {email, password} = req.body

    if(  !email || ! password){
        res.status(400)
        console.log(`${firstName} ${lastName} ${email} ${password} `)
        throw new Error('Please add all fields email, password')
    }

    const lUser = await User.findOne({email})
    if(lUser && (await bcrypt.compare(password, lUser.password))){
        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            _id:lUser._id,
            firstName:lUser.firstName,
            lastName:lUser.lastName,
            email:lUser.email,
            password:lUser.password,
            token: generateToken(lUser.id, lUser.firstName, lUser.lastName, lUser.email)
        })


    }
    else{
        res.status(200).json({
            success: false,
            message: "Invalid Credentials"
        })
        // throw new Error('Invalid Credentials')
    }

})

const viewStudent = asyncHandler(async (req, res) => {
    //var decoded = jwt.verify(req.headers['authorization'], process.env.JWT_SECRET)
    const student = await Student.findById(req.user.id)
    if(student){
        res.status(200).json(student)
    }
    else{
        res.send("User does not exist!!")

    }

})

const registerResearchTopic = asyncHandler( async (req, res) => {

    try {
        const {

            gID,

        } = req.body;
        const student = await Student.findById(gID)
        const groupID = await student.group_id;
        const group = await Group.findById(groupID);
        //console.log(gID)
        const arrLength = group.researchTopic_Data.length;

        if (!student) {
            throw new Error('There is no Student')
        }

        if (!group) {
            throw new Error('You are not registered in a group, Please first register in a group...!')
        }

        if(arrLength >= 1){
            throw new Error('You can only register 1 topic..!!!')
        }


        const {
            research_Topic,
            field,
            research_Topic_Status
        } = req.body;

        let r_topicItems = {
            research_Topic: research_Topic,
            field: field,
            research_Topic_Status:research_Topic_Status
        };

        //await Group.findOneAndUpdate(
        await Group.findOneAndUpdate(
            { _id: groupID },
            { $push: { researchTopic_Data: r_topicItems } },
            { new: true, upsert: true }
        )
        res.status(200).send({ status: "Research topic registered...!", researchTopic_Info: r_topicItems });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message });
    }
})

const registerGroup = asyncHandler(async (req, res) => {
    try {
        const {

            groupName,member_id

        } = req.body;

         let group1 = {

             groupName: groupName,

        };

        let gName = await Group.findOne({ groupName });
        if (gName) {
            throw new Error("Group name already taken");
        }

        const newgroup = new Group(group1);
        await newgroup.save()
        // return res
        //   .status(201)
        //   .send({ status: "group Created", id: newgroup._id });
        //  // console.log(group1);
        //let group = await Group.findOne({ groupName });
        // let student = await Student.findOne({  member_id});
        //
        // //update registering member status
        // const grp_status = "Registered";
        // const gID = newgroup._id;
        // student.status = grp_status;
        // student.group_id = gID;
        //
        // await student.save()
        //
        //
        // //add registering member details to student group db
        // const sid = await Student.find({ _id: member_id},{"_id":1});
        // const mem1 = await Student.findOne({ _id: member_id});
        //
        // let groupMember1 = {
        //     _id: student._id,
        //     name: student.firstName,
        //     email: student.email,
        //     //phone: mem1.phone,
        // };
        //
        // await Group.findOneAndUpdate(
        //     { _id: gID },
        //     { $push: { groupMembers: groupMember1}},
        //     { new: true, upsert: true }
        // )

        return res.status(200).json({
            success:true,
            id: newgroup._id,
            groupName : newgroup.groupName,
            //members:newgroup.groupMembers
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});
    }
})

const registerGroupMember = asyncHandler( async (req, res) => {


        const {

            email
            ,groupName

        } = req.body;
        try {
            const group = await Group.findOne({groupName :groupName})

            if (!group) {
                res.status(400).send({
                    success: false,
                    message :`There is no group..!!! ${groupName}`,
                });
                // throw new Error(`There is no group..!!! ${groupId}`)
            }



            //check whether the registering student's student id is valid or not.
            let student = await Student.findOne({email: email
            });
            if (!student) {
                res.status(400).send({
                    success: false,
                    message :"Invalid Student Email...!!!",
                });
                //throw new Error("Invalid Student ID...!!!");
            }


            //check wether the student is regstered to a group or not.
            if (student.status === "Registered") {
                res.status(400).send({
                    success: false,
                    message :"Student already registered in a group...!!!",
                });
                //throw new Error("Student already registered in a group...!!!");
            }



            ////check wether the student group is full or not.
            const arrLength = group.groupMembers.length;

            if(arrLength >= 4){
                res.status(400).send({
                    success: false,
                    message :'This group already have 4 members..!!!',
                });
                // throw new Error('This group already have 4 members..!!!')
            }else{


                //update registering member status
                const grp_status = "Registered";
                const gID = group._id;

                student.status = grp_status;
                student.group_id = gID;

                await student.save()



                //add registering member details to student group db
                const sid = await Student.find({ _id: student._id},{"_id":1});
                const mem1 = await Student.findById(sid);

                let groupMember1 = {
                    _id: student._id,
                    name: student.firstName,
                    email: student.email,
                    //phone: mem1.phone,
                };

                await Group.findOneAndUpdate(
                    { _id: gID },
                    { $push: { groupMembers: groupMember1}},
                    { new: true, upsert: true }
                )

                res.status(200).send({
                    success: true,
                    message :"Group Member Registered..",
                });

            }

        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: error.message });
        }


    }

)


const getGroupMembers = asyncHandler(

    async (req, res) => {

        const {

            userId

        } = req.body;
        const student = await Student.findById(userId)
        const groupID = await student.group_id;

        try {

            const group = await Group.findById(groupID)

            if (!group ){
                throw new Error('There is no group..!!!')
            }

            res.status(200).send({ status: "Group members retrieved", groupMembers: group.groupMembers, groupID: group._id, groupName: group.groupName


            });
        } catch (error) {
            res.status(500).send({ status: "Error with retrieve", error: error.message });
        }
    }
)

const getResearchDetails = asyncHandler(

    async (req, res) => {

        const {

            userId

        } = req.body;
        const student = await Student.findById(userId)
        const groupID = await student.group_id;

        try {

            const group = await Group.findById(groupID)

            if (!group ){
                throw new Error('There is no group..!!!')
            }

            res.status(200).send({ status: "Group members retrieved", researchTopic_Data: group.researchTopic_Data


            });
        } catch (error) {
            res.status(500).send({ status: "Error with retrieve", error: error.message });
        }
    }
)

const getGroupID = asyncHandler(
    async (req, res) =>{
        const {

            member_id

        } = req.body;
        const student = await Student.findById({_id:member_id})

        const groupID = student.group_id;

        try {
            console.log(groupID)
            const group = await Group.findById({_id :groupID})
            console.log(group)
            const arrLength = group.researchTopic_Data.length;
            const groupmem = group.groupMembers. length
            //if (!group || arrLength === 0 || groupmem >= 4){
            if (!group ){
                res.status(200).send({  status : false ,groupID: null,
                });
            }
            //const research_Data = group.researchTopic_Data


            res.status(200).send({ status : true , groupID: group._id, groupName : group.groupName,researchTopic_Data:group.researchTopic_Data,
            });
        } catch (error) {
            res.status(500).send({ status: "Error with retrieve", error: error.message });
        }
    }
)

const getTemplates = asyncHandler(

    async (req, res) => {


        try {

            const templates = await Templates.find()
            //console.log(templates)
            if (!templates ){
                throw new Error('There is no templates..!!!')
            }

            res.status(200).json(templates);
        } catch (error) {
            res.status(500).send({ status: "Error with retrieve", error: error.message });
        }
    }
)

const requestSupervisor = asyncHandler(async (req, res) => {
    try {
        const {

            groupName,

        } = req.body;


        let gName = await Group.findOne({ groupName });
        if (!gName) {
            throw new Error("No group from this group name");
        }
        let reserachDetails= gName.researchTopic_Data
        let resTopic
        let resField
        reserachDetails.map((resDet) => {
            resTopic = resDet.research_Topic
            resField = resDet.field

        })
        console.log(reserachDetails)
        let reqSupervisor = {
            groupID : gName._id,
            groupName: gName.groupName,
            research_Topic: resTopic,
            field: resField
        }

        const newreqSupervisor = new RequestSupervisor(reqSupervisor);
        await newreqSupervisor.save()
        // return res
        //   .status(201)
        //   .send({ status: "group Created", id: newgroup._id });
        //  // console.log(group1);
        return res.status(200).json({
            success:true,
            id: newreqSupervisor._id,
            groupName : newreqSupervisor.groupName,
            research_Topic: newreqSupervisor.research_Topic,
            field: newreqSupervisor.field

        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});
    }
})

const getSupervisors = asyncHandler(async (req, res) => {
    const {

        userId

    } = req.body;

    const student = await Student.findById(userId)
    //console.log(student.group_id)
    const groupID = student.group_id;
    try {
        const group = await Group.findById(groupID)
        const groupName = group.groupName
        //console.log(groupName)
        const assignedSupervisorData = await RequestSupervisor.findOne({groupName})
        //console.log(assignedSupervisorData)
        res.status(200).send(assignedSupervisorData)

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});
    }
    })

const downloadFile = asyncHandler(async (req, res) => {
        try {

            const file = await Templates.findById(req.params.id);
            // file.map((fileData) => {
            //      path = fileData.Submission_File_Path
            //
            //
            // })
            console.log(file.Template_File_Path)
            res.sendFile(file.Template_File_Path);
        } catch (error) {
            res.status(400).send('Error while downloading file. Try again later.');
        }
    }

)


module.exports = {
    registerStudent ,loginStudent, viewStudent , registerResearchTopic, registerGroup, registerGroupMember ,getGroupMembers, getGroupID, getResearchDetails, getTemplates, requestSupervisor, getSupervisors, downloadFile
}