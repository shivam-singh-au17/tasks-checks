const productService = require('../services/productService');
const mongoose = require('mongoose');
const { responseHandler: { handleResponse, handleError }, httpStatusCodes: { CREATED, BAD_REQUEST, OK }, responseStatus: { SUCCESS, FAIL } } = require('../utils');

exports.createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);

        return handleResponse(
            res,
            CREATED,
            SUCCESS,
            "Product created successfully",
            product
        );

    } catch (err) {

        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            `Failed to create Product, ${err}`
        );
    }
};

exports.updateProduct = async (req, res) => {

    const productId = req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            "Invalid productId provided!"
        );
    }

    try {
        const product = await productService.updateProduct(productId, req.body);

        return handleResponse(
            res,
            OK,
            SUCCESS,
            "Product updated successfully",
            product
        );

    } catch (err) {

        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            `Failed to update Product, ${err}`
        );
    }
};

exports.deleteProduct = async (req, res) => {

    const productId = req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            "Invalid productId provided!"
        );
    }

    try {
        const product = await productService.deleteProduct(productId);

        return handleResponse(
            res,
            OK,
            SUCCESS,
            "Product deleted successfully"
        );

    } catch (err) {

        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            `Failed to delete Product, ${err}`
        );
    }
};

exports.getOneProduct = async (req, res) => {

    const productId = req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            "Invalid productId provided!"
        );
    }

    try {
        const product = await productService.getOneProduct(productId);

        return handleResponse(
            res,
            OK,
            SUCCESS,
            "Product received successfully",
            product
        );

    } catch (err) {

        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            `Failed to get Product, ${err}`
        );
    }
};

exports.getAllProducts = async (req, res, next) => {

    try {

        const product = await productService.getAllProducts(req.query);

        return handleResponse(
            res,
            OK,
            SUCCESS,
            "All Products received successfully",
            product
        );

    } catch (err) {

        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            `Failed to get all Products, ${err}`
        );
    }
};
