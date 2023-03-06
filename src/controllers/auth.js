const services = require('../services/auth');
const { httpError } = require('../utils/httpError');

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await services.createUser(username, password);
    if (newUser === null) {
      throw new httpError('No entry made', 500);
    }
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    await services.validateUser(username, password);
    const token = await services.generateJwtToken(username);
    res.status(200).json({ message: 'User Logged In', JWTtoken: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validateUserToken = async (req, res) => {
  try {
    await services.validateUserToken(req.headers.authorization);
    res.status(200).json({ message: 'Valid User Token' });
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = { createUser, loginUser, validateUserToken };
