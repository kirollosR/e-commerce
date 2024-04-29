const express = require('express');
const AuthMiddleware = require('../middleware/authorize');
const router = express.Router(); // Add parentheses here

router.get('/', healthCheck);
router.get('/getAllUsers', getAllUsers);

module.exports = router;



