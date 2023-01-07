const express = require('express');
const { RegisterUser, LoginUser } = require('../controllers/user.controller.js');

const router = express.Router();

router.route('/register').post(RegisterUser);
router.route('/login').post(LoginUser);

module.exports = router;