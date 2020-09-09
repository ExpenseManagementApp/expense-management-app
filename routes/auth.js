const router = require('express').Router();
const userControllerRoute = require('../controller/userController');

router.route('/signUp').post(userControllerRoute.signUp);

module.exports = router;