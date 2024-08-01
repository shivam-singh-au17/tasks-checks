const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { parameterValidation } = require("../middleware");
const { register, login } = require('../validations/userValidation');

const router = express.Router();

router.post('/register', parameterValidation(register), registerUser);
router.post('/login', parameterValidation(login), loginUser);

module.exports = router;
