const router = require('express').Router();
const {
    signupHandler,
    signinHandler
} = require('../controller/authController');

router.route('/signup').post(signupHandler);
router.route('/signin').post(signinHandler);
module.exports = router;