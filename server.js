const express = require('express');
const mongoose = require('mongoose');

var fileUpload = require('express-fileupload');

const passport = require('passport');
const cors = require('cors');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const StudentSubmissions = require("./Models(db)/StudentSubmissions")
const bodyParser = require('body-parser');

//taking the student routes
const studentRoutes = require('./routes/StudentsRoute');

const authRouter = require('./routes/auth.route');
const requestRouter = require('./routes/request.route');
const submissionRouter = require('./routes/submission.route');
const chatMessageRouter = require('./routes/chat-message.route');
const userRouter = require('./routes/users.route');
const submissionTypesRouter = require('./routes/submission-types.route');
const documentsRouter = require('./routes/documents.route');
const allocatePanelRouter = require('./routes/allocate-panel.route');
const markingSchemeRouter = require('./routes/marking-scheme.route');
const { JWT_TOKEN } = require('./constants/constant');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//get the bodyparser to the app
app.use(bodyParser.json());
// encoding the bodyparser to the url, then making extends as false
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

app.use('/documents', express.static('uploads'));

// const database = 'mongodb://localhost:27017/project_management?retryWrites=true&w=majority';
const database = 'mongodb+srv://shevantha123:4vk5cHsXD6As8W4@shevanthacluster.u7yy0.mongodb.net/ResearchProject?retryWrites=true&w=majority';

mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Database connected successfully.'))
    .catch(error => console.log(error));

app.use(passport.initialize());

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = JWT_TOKEN;

passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(error => console.log(error));
    })
);

//use the student routes.
app.use('/student', studentRoutes);
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

app.use('/api/auth', authRouter);
app.use('/api/request', requestRouter);
app.use('/api/chat', chatMessageRouter);
app.use('/api/submission', submissionRouter);

app.use('/api/users', userRouter);
app.use('/api/submission-types', submissionTypesRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/allocate-panel-member', allocatePanelRouter);
app.use('/api/marking-scheme', markingSchemeRouter);


app.use('/student', studentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on ${port} port!`));