const { Product } = require('../models');

/**
 * Function to create a new product.
 * 
 * @param {Object} payload
 * @returns {Promise<Object>}
 * @throws {Error}
 */
exports.createProduct = async (payload) => {
    return await Product.create(payload);
};

/**
 * Function to update a product by its ID.
 * 
 * @param {string} productId
 * @param {Object} payload
 * @returns {Promise<Object>}
 * @throws {Error}
 */
exports.updateProduct = async (productId, payload) => {
    return await Product.findByIdAndUpdate(productId, payload, { new: true });
};

/**
 * Function to delete a product by its ID.
 * 
 * @param {string} productId
 * @returns {Promise<Object>}
 * @throws {Error}
 */
exports.deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};

/**
 * Function to get a product by its ID.
 * 
 * @param {string} productId
 * @returns {Promise<Object>}
 * @throws {Error}
 */
exports.getOneProduct = async (productId) => {
    return await Product.findById(productId);
};

/**
 * Function to get all products based on provided parameters.
 * 
 * @param {Object} payload
 * @returns {Promise<Object>}
 * @throws {Error}
 */
exports.getAllProducts = async (payload) => {
    let { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "DESC", search = "" } = payload;
    
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const matchStage = search ? {
        $match: {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        }
    } : {
        $match: {}
    };

    const sortStage = {
        $sort: {
            [sortBy]: sortOrder === "ASC" ? 1 : -1
        }
    };

    const projectStage = {
        $project: {
            _id: 1,
            title: 1,
            description: 1,
            inventoryCount: 1,
            createdAt: 1,
            updatedAt: 1
        }
    };

    const pipeline = [
        matchStage,
        sortStage,
        projectStage,
        {
            $facet: {
                data: [
                    { $skip: skip },
                    { $limit: limit }
                ],
                count: [
                    {
                        $count: 'count'
                    }
                ]
            }
        }
    ];

    try {
        const [{ data = [], count = 0 } = {}] = await Product.aggregate(pipeline).exec();
        return { data, count };
    } catch (error) {
        throw new Error(`Failed to get all products: ${error.message}`);
    }
};
