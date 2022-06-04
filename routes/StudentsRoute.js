//calling express module
const express = require('express');

const asyncHandler = require ('express-async-handler')

//creating application endpoints
//Router is the routes of the messages passing.
const studentsRoute = express.Router();

//to share the resources, we use cors
const cors = require('cors');

//to transfer information securely, we use jsonwebtoken
const jwt = require('jsonwebtoken');

//storing passwords in hashing mechanism, we use bcrypt
const bcrypt = require('bcrypt');

//importing the student model
const Students = require('../Models(db)/Student');
const {registerStudent, loginStudent, viewStudent, registerResearchTopic, registerGroup, registerGroupMember ,getGroupMembers,
    getGroupID, getResearchDetails, getTemplates,
    requestSupervisor,
    getSupervisors, downloadFile
} = require("../controllers/studentController");



studentsRoute.use(cors());

//use a secret key
// process.env.SECRET_KEY = 'secret';

//creating student routes,

//creating routes for student registry, taking student's data and create the
//student and check that student is already available or not .
//getting the studnet data and adding to the system.


studentsRoute.post('/register', registerStudent);

//student login, routes for student login

studentsRoute.post('/login', loginStudent)

// student profile
//student has to login to the system in order to view the student profile
// there has to be a session and student has to be validated student.
//Jwt token has to be authorized.
studentsRoute.get('/profile', viewStudent)

studentsRoute.post('/registerResearchTopic', registerResearchTopic)

studentsRoute.post('/registerGroup', registerGroup)

studentsRoute.route('/registerGroupMember').post(registerGroupMember)

studentsRoute.post('/getGroupMember', getGroupMembers)
studentsRoute.post('/getGroupID', getGroupID)
studentsRoute.post('/getResearchDetails',getResearchDetails)
studentsRoute.get('/getTemplates',getTemplates)
studentsRoute.post('/requestsupervisor',requestSupervisor)
studentsRoute.post('/getSupervisors',getSupervisors)
studentsRoute.get('/download/:id',downloadFile)



//exporting the routes
module.exports = studentsRoute;
