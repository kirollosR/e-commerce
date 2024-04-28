const express = require('express');
const {body, validationResult} = require("express-validator");
const healthCheck = require('../controllers/healthCheck.controller');
const addUser = require('../controllers/addUser.controller');


const router = express.Router();

/**
* @swagger
* /:
*   get:
*     tags:
*      - User
*     summary: Health check endpoint.
*     description: Retrieve a list of users from the database.
*     responses:
*       200:
*         description: Successful response with a list of users.
*/
router.get('/', healthCheck);

router.post(
    '/addUser',
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty'),
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email')
        .notEmpty()
        .withMessage('Email cannot be empty'),
    body('address')
        .isString()
        .withMessage('Address must be a string')
        .notEmpty()
        .withMessage('Address cannot be empty'),
    body('phone')
        .matches(/^01\d{9}$/)
        .withMessage('Phone number must be in the format 01xxxxxxxxx'),
     addUser);

module.exports = router;