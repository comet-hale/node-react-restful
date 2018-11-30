const express = require('express');

const user = require('../controller/user.controller');
const files = require('../controller/file.loader');
const uploading = require('../middleware/upload.middleware');
const jwtMiddleware = require('../middleware/jwt.middleware');

const router = express.Router();

// user managing
router.post('/user/login', user.login);
router.post('/user/signup', user.create);
router.get('/user/manage', jwtMiddleware, user.findAll);
router.put('/user/update', jwtMiddleware, user.update);
router.delete('/user/delete', jwtMiddleware, user.delete);

// file uploading and downloading
router.post('/upload', uploading.single('avatar'), jwtMiddleware, files.upload);
// router.get('/download', users.download);

module.exports = router;
