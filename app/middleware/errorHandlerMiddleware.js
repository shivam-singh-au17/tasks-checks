const { responseHandler: { handleError }, httpStatusCodes: { INTERNAL_SERVER_ERROR }, responseStatus: { FAIL, FAIL_MESSAGE } } = require('../utils');

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    return handleError(res, INTERNAL_SERVER_ERROR, FAIL, FAIL_MESSAGE);
};
