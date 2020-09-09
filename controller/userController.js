const User = require('../models/user');
const errorHandler = require('errorhandler');
const bcrypt = require('bcryptjs');
const {
    signUp
} = require('../validation/validate');
module.exports = {
    signUp: async (req, res) => {
        try {

            //validator with hapi/joi
            const {
                error
            } = signUp(req.body);
            if (error) return res.status(400).json({
                message: error.details[0].context.label
            });


            //hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            //check username
            const userExist = await User.findOne({
                username: req.body.username
            });
            if (userExist)
                return res
                    .status(400)
                    .send({
                        message: 'UserName is already exist',

                    });


            //Create a new user
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashPassword
            });
            await user.save();
            res.status(201).send({
                message: 'Registration Sucessfully'
            });
        } catch (err) {
            if (err) {
                return res.status(400).send({
                    message: err.name === 'MongoError' && err.code === 11000 ?
                        'Email already exists !' : errorHandler.getErrorMessage(err)
                });
            }
            res.status(400).json({
                message: 'An error occured',
                error: err
            });
        }
    }
}