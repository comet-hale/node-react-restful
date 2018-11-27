const db = require('../models');
const token = require('../middleware/jwt.middleware');

const user = db.User;

// Login a user
exports.login = (req, res) => {
  const { username, password } = req.body;
  user
    .find({
      where: {
        username,
        password
      }
    })
    .then(() => {
      console.log(token.creatToken(username));
      res.send({
        token: token.creatToken(username),
        emailAddress,
        username
      });
    })
    .catch(err => res.status(401).send('Unauthorized'));
};

// Create a user
exports.create = (req, res) => {
  const { emailAddress, username, password } = req.body;
  user
    .find({
      where: {
        emailAddress
      }
    })
    .then((ret) => {
      if (ret !== null) {
        res.send('Registered email');
        return;
      }
      user
        .create({
          emailAddress,
          username,
          password
        })
        .then(
          res.send({
            token: token.creatToken(username),
            emailAddress,
            username
          })
        );
    });
};

// Fetch all users
exports.findAll = (req, res) => {
  if (token.verifyToken(req.headers.authorization) !== null) {
    user.findAll().then((users) => {
      res.send(users);
    });
  } else {
  }
};

// Update a user
exports.update = (req, res) => {
  if (token.verifyToken(req.headers.authorization) !== null) {
    const { emailAddress, username, password } = req.body;
    user
      .update(
        {
          emailAddress,
          username,
          password
        },
        {
          where: { username }
        }
      )
      .then(
        res.send({
          token: token.creatToken(username),
          emailAddress,
          username
        })
      );
  } else {
  }
};

// Delete a user
exports.delete = (req, res) => {
  const username = token.verifyToken(req.headers.authorization);
  if (username !== null) {
    user
      .destroy({
        where: { username }
      })
      .then(() => {
        res.status(200).send('deleted successfully a user');
      });
  } else {
  }
};
