const express = require('express');
const {body} = require("express-validator");
const healthCheck = require('../controllers/healthCheck.controller');
const addUser = require('../controllers/addUser.controller');
const getAllUsers = require('../controllers/getAllUsers.controller');
const getUserById = require('../controllers/getUserById.controller');
const updateUser = require('../controllers/updateUser.controller');


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

// TODO: admin middleware

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

// TODO: update user using patch
// router.patch('/updateUser/:id', updateUser);
router.patch(
    '/updateUser/:id',
    body('name')
        .optional()
        .isString()
        .withMessage('Name must be a string'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Email must be a valid email'),
    body('address')
        .optional()
        .isString()
        .withMessage('Address must be a string'),
    body('phone')
        .optional()
        .matches(/^01\d{9}$/)
        .withMessage('Phone number must be in the format 01xxxxxxxxx'),
        updateUser);
// TODO: delete user using delete by ID
// TODO: get user by ID or Token

// TODO: add admin middleware to the function
router.get('/getAllUsers', getAllUsers);

router.get('/getUserById/:id', getUserById);

module.exports = router;