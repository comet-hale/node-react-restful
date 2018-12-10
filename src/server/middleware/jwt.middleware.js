const jwt = require('jsonwebtoken');
const key = require('../config/token.key.js');

// Verify token
const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      const id = jwt.verify(authorization.split(' ')[1], key.secret);
      if (id !== undefined) {
        res.locals.userId = id;
        next();
      } else {
        res.status(403).send('Token is invalid');
      }
    } else {
    }
  } catch (err) {}
};

module.exports = verifyToken;
