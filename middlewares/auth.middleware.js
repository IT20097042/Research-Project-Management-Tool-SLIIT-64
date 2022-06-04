const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../constants/constant');


const authenticationMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, JWT_TOKEN, (err, data) => {
                if (err) {
                    return res.status(403).json({
                        success: false,
                        message: 'Token is expired or invalid.'
                    });
                }

                req.userInfo = data;
                next();
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Access token is not found.'
            });
        }
    } catch {
        res.status(401).json({
            success: false,
            message: 'Please contact administrator!'
        });
    }
};

module.exports = authenticationMiddleware;