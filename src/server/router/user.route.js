const express = require('express');

const router = express.Router();
const users = require('../controller/user.controller.js');
const uploading = require('../controller/upload/upload');

// Retrieve all user(usermange)
router.get('/users/manage', users.findAll);
// Retrieve a single user by Id
router.get('/users/:userId', users.findById);
// Update a user with Id
router.put('/users/update', users.update);
// Delete a user with Id
router.delete('/users/delete', users.delete);
// Login a user
router.post('/users/login', users.login);
// Signup a user
router.post('/users/signup', users.create);

// upload a file
router.post('/upload', uploading.single('avatar'), users.upload);

module.exports = router;
