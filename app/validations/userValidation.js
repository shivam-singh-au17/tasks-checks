const Joi = require("joi");

module.exports = {
    register: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required().min(8).max(20).alphanum(),
        role: Joi.array().items(Joi.string().valid("ADMIN", "MANAGER", "STAFF")).unique().required(),
    }),

    login: Joi.object({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required().min(8).max(20).alphanum(),
    }),
};
