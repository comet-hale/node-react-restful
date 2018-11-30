const jwt = require('jsonwebtoken');
const key = require('../config/token.key.js');

// Create token
const creatToken = username => jwt.sign(username, key.secret);

module.exports = creatToken;
