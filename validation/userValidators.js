const Joi = require('joi');

const signupValidator = (obj) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: ['com', 'net'] })
      .trim()
      .required()
      .label('Invalid Email Address!'),
    username: Joi.string()
      .min(3)
      .max(30)
      .trim()
      .required()
      .label('Invalid username!'),
    password: Joi.string()
      .min(6)
      .max(30)
      .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
      .required()
      .label('Invalid Password, Please try another one.')
  });

  const { error } = schema.validate(obj);
  return error;
};

module.exports.signupValidator = signupValidator;
