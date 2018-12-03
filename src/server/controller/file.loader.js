const fs = require('fs-extra');
const db = require('../models');

const uploadData = db.uploadData;

// File uploading
exports.upload = (req, res) => {
  console.log(res.locals.user);
  uploadData
    .create({
      user: res.locals.user,
      filename: `${req.file.filename}`
    })
    .then((fileInfo) => {
      res.status(200).send({
        filename: fileInfo.filename,
        createdAt: fileInfo.createdAt
      });
    })
    .catch((err) => {
      res.status(500).send('Server Error');
    });
};

// File downloading
exports.downloadFile = (req, res) => {
  try {
    console.log(__dirname);
    const buffer = fs.readFileSync(`F:/projects/express_react/upload/${req.query.value}`);
    const bufferBase64 = new Buffer(buffer);
    res.status(200).send(bufferBase64);
  } catch (e) {
    res.status(500).send('Server Error');
  }
};

// Get uploaded files
exports.getUploadedFiles = (req, res) => {
  uploadData
    .findAll({
      attributes: ['filename', 'createdAt'],
      where: { user: res.locals.user }
    })
    .then((files) => {
      res.send(files);
    })
    .catch(err => res.status(500).send('Server Error'));
};
