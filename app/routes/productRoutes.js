const express = require('express');
const { createProduct, updateProduct, deleteProduct, getAllProducts, getOneProduct } = require('../controllers/productController');
const { authMiddleware, authorizationMiddleware, parameterValidation, queryValidation } = require("../middleware");
const { createOrUpdate, getAllProduct } = require('../validations/productValidation');
const { apisPermittedRoles: { PRODUCT: { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, GET_ALL_PRODUCT, GET_ONE_PRODUCT } } } = require("../utils");

const router = express.Router();

router.post('/', authMiddleware, authorizationMiddleware(CREATE_PRODUCT), parameterValidation(createOrUpdate), createProduct);

router.patch('/:productId', authMiddleware, authorizationMiddleware(UPDATE_PRODUCT), parameterValidation(createOrUpdate), updateProduct);

router.delete('/:productId', authMiddleware, authorizationMiddleware(DELETE_PRODUCT), deleteProduct);

router.get('/', authMiddleware, authorizationMiddleware(GET_ALL_PRODUCT), queryValidation(getAllProduct), getAllProducts);
router.get('/:productId', authMiddleware, authorizationMiddleware(GET_ONE_PRODUCT), getOneProduct);

module.exports = router;
