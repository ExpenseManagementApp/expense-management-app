const router = require('express').Router();
const { signupHandler } = require('../controller/authController');

router.route('/signup').post(signupHandler);

module.exports = router;
