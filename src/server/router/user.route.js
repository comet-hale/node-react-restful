const express = require('express');

const router = express.Router();
const user = require('../controller/user.controller');
const files = require('../controller/file.load');
const uploading = require('../middleware/upload.middleware');

// user manage
router.get('/user/manage', user.findAll); // all user getting
router.put('/user/update', user.update); // update
router.delete('/user/delete', user.delete); // delete
router.post('/user/login', user.login); // login
router.post('/user/signup', user.create); // signup

// file up/down load
router.post('/upload', uploading.single('avatar'), files.upload);
// router.get('/download', users.download);
module.exports = router;
