const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

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

app.use('/api/auth', authRouter);
app.use('/api/request', requestRouter);
app.use('/api/chat', chatMessageRouter);
app.use('/api/submission', submissionRouter);

app.use('/api/users', userRouter);
app.use('/api/submission-types', submissionTypesRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/allocate-panel-member', allocatePanelRouter);
app.use('/api/marking-scheme', markingSchemeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on ${port} port!`));