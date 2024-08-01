const Joi = require("joi");

module.exports = {
    createOrUpdate: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        inventoryCount: Joi.number().required(),
    }),

    getAllProduct: Joi.object({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        sortBy: Joi.string().optional(),
        sortOrder: Joi.string().valid('ASC', 'DESC').optional(),
        search: Joi.string().optional(),
    }),
};
