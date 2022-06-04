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
const { JWT_TOKEN } = require('./constants/constant');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/documents', express.static('uploads'));

const database = 'mongodb://localhost:27017/project_management?retryWrites=true&w=majority';

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on ${port} port!`));