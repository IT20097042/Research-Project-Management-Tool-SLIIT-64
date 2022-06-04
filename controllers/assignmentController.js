const asyncHandler = require ('express-async-handler')

const Assignments = require('../Models(db)/Assignments')

const getAssignments = asyncHandler(async (req, res) =>{
    const assignments = await Assignments.find();

    res.status(200).json(assignments)
})

const addAssignments = asyncHandler(async (req, res)=>{

        const{course, assignment_name, deadline} = req.body
        const assignment = await Assignments.create({
            course,
            assignment_name,
            deadline
        })
        if(assignment){
            res.status(201).json({
                _id:assignment.id,
                course:assignment.course,
                assignment_name : assignment.assignment_name,
                deadline : assignment.deadline,
                date : assignment.date
            })
        }else {
            res.status(400).json({'error ': 'Unable to save'})
        }

})

module.exports = {
    getAssignments, addAssignments
}