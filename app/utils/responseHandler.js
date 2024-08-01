const { OK, INTERNAL_SERVER_ERROR } = require('./httpStatusCodes');
const { SUCCESS, FAIL, SUCCESS_MESSAGE, FAIL_MESSAGE } = require('./responseStatus');

/**
 * Function to handle successful responses by sending a JSON response with the specified status code, message, and data.
 */
const handleResponse = (res, statusCode = OK, status = SUCCESS, message = SUCCESS_MESSAGE, data) => {
    const responseObject = { status, message };
    if (data !== undefined) responseObject.data = data;

    res.status(statusCode).json(responseObject);
};

/**
 * Function to handle errors by sending a JSON error response with the specified status code and message.
 */
const handleError = (res, statusCode = INTERNAL_SERVER_ERROR, status = FAIL, message = FAIL_MESSAGE) => {
    res.status(statusCode).json({ status, message });
};

module.exports = { handleResponse, handleError };
