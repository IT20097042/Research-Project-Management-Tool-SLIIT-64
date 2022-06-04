var express = require('express');
 var fileUpload = require('express-fileupload');
 var path = require('path');
const dotenv = require('dotenv').config()
 const cors = require('cors');
const StudentSubmissions = require("./Models(db)/StudentSubmissions")

var bodyParser = require('body-parser');

//taking the student routes
var studentRoutes = require('./routes/StudentsRoute');
//taking the assignment routes
var assignmentRoutes = require('./routes/AssignmentsRoute');

const connectDB = require('./config/db')

const port = process.env.PORT ||5000;

//initializing express to app variable
var app = express();
app.use(cors());

//creating mongodb instance
var mongoose = require('mongoose');

app.use(express.json());


//get the bodyparser to the app
app.use(bodyParser.json());


// encoding the bodyparser to the url, then making extends as false
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

//use the student routes.
app.use('/student', studentRoutes);
app.use('/assignment', assignmentRoutes);

//file upload initializer
 app.use(fileUpload());

//file upload end point,
//it is a post request since we are adding a file
//creating a route to the files end point
app.post('/upload', (req, res) =>{
    const{
        groupName, filename
    } = req.body
    // if no there is no file
    if(req.files === null){
        return res.status(400).json( {msg :'No file uploaded'});
    }
    //create a file
    const file = req.files.file;
    //when we upload a file to the system , it will save or visible in our project folder
    file.mv(`${__dirname}/public/uploads/${file.name }`, err => {
        if(err){
            console.error(err);
            res.status(500).send(err);
        }
        const filepath = StudentSubmissions.create({
            Submission_File_Path : `${__dirname}/public/uploads/${file.name }`,
            Group_Name : groupName,
            File_Name :filename
        })
        res.json({fileName: file.name, filePath: `/uploads/${file.name}`, })

    })
})


// var corsOptions = {
//     origin : '*',
//     optionsSuccessStatus: 200,
// }
//
// app.use(cors(corsOptions));

//creating the database connection,
//database uri
//mongodb port = 27017

//creating the connection from mongoose
connectDB()



//use the student routes.
app.use('/students', studentRoutes);
app.use('/assignment', assignmentRoutes);
//listening to the requests,
app.listen(port, () =>{
    console.log('Server is listening on port' + port);
})