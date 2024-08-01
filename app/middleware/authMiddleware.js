require('dotenv').config();
const jwt = require('jsonwebtoken');
const { responseHandler: { handleError }, httpStatusCodes: { BAD_REQUEST, UNAUTHORIZED }, responseStatus: { FAIL } } = require('../utils');

/**
 * Function to verify a JWT token using a secret key.
 */
const verifyToken = async (token) => {
    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = async (req, res, next) => {

    const bearerToken = req?.headers?.authorization;

    if (!bearerToken) {
        return handleError(res, BAD_REQUEST, FAIL, 'Authorization header token is missing');
    }

    if (!bearerToken.startsWith("Bearer ")) {
        return handleError(res, BAD_REQUEST, FAIL, 'Authorization header token must start with "Bearer "');
    }

    const token = bearerToken.split(" ")[1].trim();

    try {

        const user = await verifyToken(token);
        req.user = user.user;
        return next();

    } catch (error) {

        return handleError(res, UNAUTHORIZED, FAIL, 'Unauthorized, invalid token!');
    }
};
