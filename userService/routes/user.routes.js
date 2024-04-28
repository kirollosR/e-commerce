const express = require('express');
// const userController = require('../controllers/user.controller');
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

router.post('/addUser', addUser);

module.exports = router;