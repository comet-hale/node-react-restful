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
        if (samePassword === true) {
          res.status(201).send({
            token: creatToken(username),
            emailAddress: ans.emailAddress,
            username
          });
        } else {
          res.status(402).send('Password is invalid');
        }
      });
    })
    .catch((err) => {
      res.status(401).send('Username is invalid');
    });
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
        res.status(405).send('Registered email or username');
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
  const { username, oldPassword, newPassword } = req.body;
  user.find({ where: { username } }).then((ans) => {
    bcrypt.compare(oldPassword, ans.password).then((samePassword) => {
      if (samePassword) {
        bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
          user
            .update(
              {
                password: hashedPassword
              },
              {
                where: { username }
              }
            )
            .then(
              res.send({
                token: creatToken(username)
              })
            );
        });
      } else {
        res.status(402).send('Old password in invalid');
      }
    });
  });
};

// Delete a user
exports.delete = (req, res) => {
  user
    .destroy({
      where: { username: req.body.username }
    })
    .then(() => {
      res.status(200).send('Deleted successfully a user');
    });
};
