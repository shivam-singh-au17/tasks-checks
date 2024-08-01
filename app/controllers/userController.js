const userService = require('../services/userService');
const { responseHandler: { handleResponse, handleError }, httpStatusCodes: { CREATED, BAD_REQUEST, OK }, responseStatus: { SUCCESS, FAIL } } = require('../utils');

exports.registerUser = async (req, res) => {
    try {
        const { username, email } = await userService.registerUser(req.body);

        return handleResponse(
            res,
            CREATED,
            SUCCESS,
            "User registered successfully",
            { username, email }
        );

    } catch (err) {

        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            `Could not register user, ${err}`
        );
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await userService.authenticateUser(req.body);

        return handleResponse(
            res,
            OK,
            SUCCESS,
            "Logged in successfully",
            user
        );

    } catch (err) {

        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            `Login attempt was unsuccessful, ${err}`
        );
    }
};
