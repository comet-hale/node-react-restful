const express = require('express');

const router = express.Router();
const users = require('../controller/user.controller.js');
const uploading = require('../controller/file.upload');

// user manage
router.get('/users/manage', users.findAll); // all user getting
router.get('/users/:userId', users.findById); // user by id
router.put('/users/update', users.update); // update
router.delete('/users/delete', users.delete); // delete
router.post('/users/login', users.login); // login
router.post('/users/signup', users.create); // signup

// file up/down load
router.post('/upload', uploading.single('avatar'), users.upload);
// router.get('/download', users.download);
module.exports = router;
