const JWT = require('jsonwebtoken');

const generateToken = (obj) => {
  const token = JWT.sign(obj, process.env.JWT_KEY, { expiresIn: '24h' });
  return token;
};

const compare = (token) => {
  const status = JWT.verify(token);

  return status;
};

module.exports.generateToken = generateToken;
module.exports.compare = compare;
