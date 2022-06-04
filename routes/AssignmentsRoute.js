//calling express module
const express = require('express');

//creating application endpoints
//Router is the routes of the messages passing.
const assignmentsRoute = express.Router();

//to share the resources, we use cors
//const cors = require('cors');





//importing the Assignments model
const Assignments = require('../Models(db)/Assignments')

const {getAssignments, addAssignments} = require("../controllers/assignmentController");



//assignmentsRoute.use(cors());



//create an assignment
assignmentsRoute.route('/add').post(addAssignments)

//Display all assignments


assignmentsRoute.route('/').get(getAssignments);



//deleting a specific assignment
//by passing the id
assignmentsRoute.route('/delete:id').delete(function (req, res){
    //id which we need to delete
    //callback function
    Assignments.findByIdAndRemove({_id: req.params.id}, function(err, assignment){
        if(err){
            res.json(err);
        }
        else{
            res.json(" Successfully removed")
        }
    })
})

//exporting the routes
module.exports = assignmentsRoute;