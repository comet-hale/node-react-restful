const jwt = require('jsonwebtoken');
const config = require('../config/token_config.js');
const db = require('../models');

const user = db.User;
const uploadData = db.uploadData;

// Login a user and return token
exports.login = (req, res) => {
  const { username, password } = req.body;
  user
    .find({
      where: {
        username,
        password
      }
    })
    .then((user) => {
      const { emailAddress, username, password } = user;
      const usertoken = jwt.sign(username, config.secret);
      res.send({
        token: usertoken,
        emailAddress,
        username,
        password
      });
    })
    .catch(err => res.status(401).send('Unauthorized'));
};

// Create a user(signup)
exports.create = (req, res) => {
  user
    .find({
      where: {
        emailAddress: req.body.emailAddress
      }
    })
    .then((ret) => {
      if (ret !== null) res.send('Registered email');
      if (ret == null) {
        const { emailAddress, username, password } = req.body;
        user
          .create({
            emailAddress,
            username,
            password
          })
          .then((user) => {
            // Send created user to client
            const { emailAddress, username, password } = user;
            const usertoken = jwt.sign(username, config.secret);
            res.send({
              token: usertoken,
              emailAddress,
              username,
              password
            });
          });
      }
    });
};

// Fetch all users(usermanage)
exports.findAll = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    user
      .findOne({
        where: { username: decoded }
      })
      .then(
        user.findAll().then((users) => {
          res.send(users);
        })
      );
  } catch (err) {}
};

// Update a user's
exports.update = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    console.log(decoded);
    user
      .findOne({
        where: { username: decoded }
      })
      .then(() => {
        const { emailAddress, username, password } = req.body;
        user
          .update(
            {
              emailAddress,
              username,
              password
            },
            {
              where: { username: decoded }
            }
          )
          .then(() => {
            const usertoken = jwt.sign(username, config.secret);
            res.send({
              token: usertoken,
              emailAddress,
              username,
              password
            });
          });
      });
  } catch (err) {}
};

// Delete a user by Id
exports.delete = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    user
      .destroy({
        where: { username: decoded }
      })
      .then(() => {
        res.status(200).send('deleted successfully a user');
      });
  } catch (err) {}
};

// Find a user by Id
exports.findById = (req, res) => {
  user.findById(req.params.userId).then((user) => {
    res.send(user);
  });
};

// File uploading
exports.upload = (req, res) => {
  const filePath = `${req.protocol}://${req.domain}/${req.file.filename}`;
  uploadData
    .create({
      filename: req.body.filename,
      url: filePath
    })
    .then((user) => {
      res.send(user);
    });
};
