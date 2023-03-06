const jwt = require('jsonwebtoken');
const { httpError } = require('./httpError');

const generateToken = (userDetail) => {
  const payload = {
    id: userDetail.id,
    hashedPassword: userDetail.password,
  };
  // const secretKey = process.env.SECRET_KEY;
  const secretKey = 'secretUser';
  const token = jwt.sign(payload, secretKey);
  return token;
};

const validateToken = (token) => {
  // const secretKey = process.env.SECRET_KEY;

  const Token = token.replace('Bearer ', '');
  const secretKey = 'secretUser';
  try {
    const decodedToken = jwt.verify(Token, secretKey);
    return decodedToken;
  }
  catch (err) {
    throw new httpError('Failed to verify JWT Token', 401);
  }
};

module.exports = { generateToken, validateToken };