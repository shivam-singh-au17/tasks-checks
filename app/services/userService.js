require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');


/**
 * Function to register a new user.
 * 
 * @param {Object} payload
 * @returns {Promise<Object>}
 * @throws {Error}
 */
exports.registerUser = async (payload) => {

    const user = await User.findOne({ email: payload.email }).lean().exec();
    if (user) throw new Error('User already exist');

    return await User.create(payload);
};


/**
 * Function to generate an authentication token for a user.
 * 
 * @param {Object} user 
 * @returns {string}
 */
exports.generateAuthToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};


/**
 * Function to authenticate a user.
 * 
 * @param {Object} payload
 * @returns {Promise<Object>}
 * @throws {Error}
 */
exports.authenticateUser = async (payload) => {

    const user = await User.findOne({ email: payload.email }).exec();
    if (!user) throw new Error("You haven't registered yet. Please register first");

    const match = await user.checkPassword(payload.password);
    if (!match) throw new Error("Wrong Password or Email... try again");

    const token = this.generateAuthToken(user);

    const { username, email, role } = user;
    return { user: { username, email, role }, token };
};
