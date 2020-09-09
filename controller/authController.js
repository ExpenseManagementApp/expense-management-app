const DBUser = require('../models/user');
const { signupValidator } = require('../validation/userValidators');
const { ErrorHandler } = require('../helpers/error');
const { createHash } = require('../helpers/hasher');
const { generateToken } = require('../helpers/token');

const signupHandler = async (req, res, next) => {
  try {
    const error = await signupValidator(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
      return;
    }

    const isUser = await DBUser.findOne({ username: req.body.username });
    if (isUser) {
      throw new ErrorHandler(
        400,
        'User Already Exist, Please Login or Forget Password.'
      );
      return;
    }

    const { hash, salt } = createHash(req.body.password);

    const user = await DBUser.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      salt: salt
    });

    const token = await generateToken({ id: user._id });
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
};

module.exports.signupHandler = signupHandler;
