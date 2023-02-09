const models = require('../../database/models');
const { encryptPassword, passwordValidation } = require('../utils/hashPassword');
const { httpError } = require('../utils/httpError');
const { generateToken, validateToken } = require('../utils/jwt');
const { getToken, storeToken } = require('../utils/redisToken');


const createUser = async (username, password) => {
  const usernameExists = await models.User.findOne({
    where: {
      username: username
    }
  });
  if (usernameExists) throw new httpError('Username exists', 500);
  const encryptedPassword = await encryptPassword(password);
  const newUser = await models.User.create({ username: username, password: encryptedPassword });
  return newUser;
};

const validateUser = async (username, password) => {
  const validUsername = await models.User.findOne({
    where: {
      username: username
    }
  });
  if (validUsername === null) throw new httpError('Username not found', 500);

  const result = passwordValidation(password, validUsername.password);

  if (!result) throw new httpError('Wrong password', 500);
};

const generateJwtToken = async (username) => {
  const userDetail = await models.User.findOne({
    where: {
      username: username
    }
  });
  const Token = generateToken(userDetail);
  if (!Token) throw new httpError('Token generation failed', 500);
  const token = ''.concat('Bearer ', Token);
  await storeToken(token);
  return token;
};

const validateUserToken = async (reqToken) => {
  const decoded = validateToken(reqToken);
  await getToken();

  return decoded;
};

module.exports = { createUser, validateUser, generateJwtToken, validateUserToken };