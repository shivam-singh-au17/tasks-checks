const { httpStatusCodes: { BAD_REQUEST } } = require('../utils');

module.exports = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
        res.status(BAD_REQUEST).json({ errors: error.details.map(item => item.message).join(', ') });
    } else {
        next();
    }
};
