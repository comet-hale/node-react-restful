const jwt = require('jsonwebtoken');
const config = require('../config/token_config.js');
const db = require('../models');

const userModel = db.User;

const verifyDecoded = (username) => {
  userModel
    .findOne({
      where: { username }
    })
    .then(() => username)
    .catch(() => null);
};

// Fetch all users(usermanage)
exports.verifyToken = (token) => {
  if (!token) {
    return null;
  }
  try {
    verifyDecoded(jwt.verify(token, config.secret));
  } catch (err) {}
};

// Send created user to client
exports.creatToken = (username) => {
  jwt.sign(username, config.secret);
};
