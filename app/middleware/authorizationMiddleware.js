const { responseHandler: { handleError }, httpStatusCodes: { FORBIDDEN, INTERNAL_SERVER_ERROR }, responseStatus: { FAIL } } = require('../utils');

module.exports = (permittedRoles) => {

    if (!Array.isArray(permittedRoles)) {
        throw new Error('permittedRoles must be an array.');
    }

    return (req, res, next) => {
        const user = req.user;

        if (!user || !Array.isArray(user.role)) {
            return handleError(res, INTERNAL_SERVER_ERROR, FAIL, 'User role not properly configured.');
        }

        const isPermittedArray = user.role.some(role => permittedRoles.includes(role));

        if (!isPermittedArray) {
            return handleError(res, FORBIDDEN, FAIL, 'Unauthorized, You are not permitted to access this!');
        }

        return next();
    };
};