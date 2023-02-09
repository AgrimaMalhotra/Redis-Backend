const redis = require('redis');
const { httpError } = require('./httpError');
const client = redis.createClient();

const storeToken = async (token) => {
  await client.connect();
  await client.set('token', token, 'EX', 60 * 30, (err,) => {
    if (err) {
      throw new httpError('Token caching failed', 500);
    }
  });
};

const getToken = async () => {
  await client.connect();
  await client.get('token', (err, result) => {
    if (err || !result) {
      throw new httpError('Token expired', 401);
    }
  });
};

module.exports = { storeToken, getToken };