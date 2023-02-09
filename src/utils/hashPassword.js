const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
  //error!
  // const encryptedPassword = await bcrypt.hash(password, process.env.SALT);
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};

const passwordValidation = async (password, storedPassword) => {
  const result = await bcrypt.compare(password, storedPassword);
  return result;
};

module.exports = { encryptPassword, passwordValidation };