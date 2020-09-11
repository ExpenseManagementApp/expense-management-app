const DBUser = require('../models/user');
var crypto = require('crypto');
const {
  signupValidator,
  signinValidator
} = require('../validation/userValidators');
const {
  ErrorHandler
} = require('../helpers/error');
const {
  hashPwd,
  hashDecrypt
} = require('../helpers/hasher');
const {
  generateToken
} = require('../helpers/token');

module.exports = {
  signupHandler: async (req, res, next) => {
    try {
      const error = await signupValidator(req.body);
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
        return;
      }

      const isUser = await DBUser.findOne({
        username: req.body.username
      });
      if (isUser) {
        throw new ErrorHandler(
          400,
          'User Already Exist, Please Login or Forget Password.'
        );
        return;
      }

      const {
        hash,
        salt
      } = hashPwd(req.body.password);

      console.log(createHash(req.body.password))

      const user = await DBUser.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        salt: salt
      });

      const token = await generateToken({
        id: user._id
      });
      user.password = undefined;
      user.salt = undefined;
      user.__v = undefined;

      res.status(201).json({
        message: 'User Successfully created!',
        token,
        user
      });
    } catch (err) {
      next(err);
    }
  },
  signinHandler: async (req, res, next) => {
    try {
      const error = await signinValidator(req.body);
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
        return;
      }
      const isUser = await DBUser.findOne({
        username: req.body.username
      });
      if (isUser) {
        const hashPass = hashDecrypt(isUser.salt, req.body.password);
        if (isUser.password === hashPass) {
          const token = await generateToken({
            id: isUser._id
          });
          res.status(201).json({
            message: 'User Login Successfully!',
            token
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }
}