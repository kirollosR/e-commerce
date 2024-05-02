const express = require('express');
const { body } = require("express-validator");
const healthCheck = require('../controllers/healthCheck.controller');
const addUser = require('../controllers/addUser.controller');
const getAllUsers = require('../controllers/getAllUsers.controller');
const getUser = require('../controllers/getUser.controller');
const updateUser = require('../controllers/updateUser.controller');
const getIdByToken = require('../controllers/getIdByToken.controller');
const deleteUser = require('../controllers/deleteUser.controller');
const admin = require('../middleware/admin');
const authorized = require('../middleware/authorized');



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
router.get('/healthCheck', healthCheck);



/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - User
 *     description: add User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Kirollos rafik
 *               email: 
 *                 type: string
 *                 example: k@gmail.com
 *               usrname:
 *                 type: string
 *                 example: k123
 *               phone:
 *                 type: string
 *                 example: 01234567890
 *               address:
 *                 type: string
 *                 example: 17 mohamed street
 *     responses:
 *       '201':
 *         description: Created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 id:
 *                   type: string
 *                   example: 662ec00131ad8002c77c734a
 *                 message:
 *                   type: string
 *                   example: User created!
 */
router.post(
    '/',
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

router.patch(
    '/',
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
        authorized,
        updateUser);

router.delete('/:id', admin, deleteUser);

// router.get('/getIdByToken/:token', getIdByToken);

router.get('/', admin, getAllUsers);

router.get('/getUser/', authorized, getUser);

module.exports = router;