const redis = require('redis');
const { httpError } = require('./httpError');

const config={
  socket:{
    host:'docker.for.mac.localhost',
    port:6379
  }
};
const client = redis.createClient(config);//by default takes host as localhost -> change here

// const client = redis.createClient();
client.connect();

const storeToken = async (token) => {
  await client.set('token', token, 'EX', 60 * 30, (err,) => {
    if (err) {
      throw new httpError('Token caching failed', 500);
    }
  });
};

const getToken = async () => {
  await client.get('token', (err, result) => {
    if (err || !result) {
      throw new httpError('Token expired', 401);
    }
    return result;
  });
};

module.exports = { storeToken, getToken };