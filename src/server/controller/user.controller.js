const bcrypt = require('bcrypt');
const db = require('../models');
const creatToken = require('../helper/token.create');

const BCRYPT_SALT_ROUNDS = 10;
const user = db.User;

// Login a user
exports.login = (req, res) => {
  const { username, password } = req.body;
  user
    .find({
      where: { username }
    })
    .then((ans) => {
      bcrypt.compare(password, ans.password).then((samePassword) => {
        if (samePassword) {
          res.send({
            token: creatToken(username),
            emailAddress: ans.emailAddress,
            username
          });
        }
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
      bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => user
        .create({
          emailAddress,
          username,
          password: hashedPassword
        })
        .then(
          res.send({
            token: creatToken(username),
            emailAddress,
            username
          })
        ));
    });
};

// Fetch all users
exports.findAll = (req, res) => {
  user.findAll({ attributes: ['emailAddress', 'username'] }).then((users) => {
    res.send(users);
  });
};

// Update a user
exports.update = (req, res) => {
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
        token: creatToken(username),
        emailAddress,
        username
      })
    );
};

// Delete a user
exports.delete = (req, res) => {
  user
    .destroy({
      where: { username: req.body.username }
    })
    .then(() => {
      res.status(200).send('deleted successfully a user');
    });
};
