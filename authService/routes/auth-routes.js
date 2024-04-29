const express = require('express');
const AuthMiddleware = require('../controllers/auth-controller');
const router = express.Router();

const User = require('../models/auth-model');
const { body, validationResult } = require("express-validator")

router.get('/', healthCheck);
router.get('/getAllUsers', getAllUsers);
router.get('/getIDbyToken/:token', getIDbyToken)


router.post(
    "/login",
    body("username")
      .isString()
      .withMessage("please enter a valid name")
      .isLength({ min: 5, max: 20 })
      .withMessage("name should be between (10-20) character"),
    body("password")
      .isLength({ min: 3, max: 100 })
      .withMessage("password should be between (8-12) character"),
    login
)


router.post(
    '/register',
    body('username')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 5, max: 20 })
    .withMessage("name should be between (5-20) character"),
    body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty'),
    body('email')
    .isEmail()
    .withMessage('Please enter a valid Email')
    .notEmpty()
    .withMessage('Email cannot be empty'),
    body("password")
    .isLength({ min: 5, max: 12 })
    .withMessage("password should be between (8-12) character"),
    body('address')
    .isString()
    .withMessage('Address must be a string')
    .notEmpty()
    .withMessage('Address cannot be empty'),
    body('phone')
    .matches(/^01\d{9}$/)
    .withMessage('Phone number must be in the format 01xxxxxxxxx'),
    register);
    
    
module.exports = router;
