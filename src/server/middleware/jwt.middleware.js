const jwt = require('jsonwebtoken');
const key = require('../config/token.key.js');

// Verify token
const verifyToken = (req, res, next) => {
  const { authentification } = req.headers;
  try {
    const auth = jwt.verify(authentification, key.secret);
    if (auth !== undefined) {
      res.locals.user = auth;
      next();
    } else {
      res.status(403).send('Token is invalid');
    }
  } catch (err) {}
};

module.exports = verifyToken;
