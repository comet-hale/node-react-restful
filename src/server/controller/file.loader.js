const fs = require('fs-extra');
const db = require('../models');

const uploadData = db.uploadData;

// File uploading
exports.upload = (req, res) => {
  const fileUrl = `${req.file.filename}`;
  console.log(fileUrl);
  uploadData
    .create({
      description: req.body.filename,
      filename: `${req.file.filename}`
    })
    .then((response) => {
      res.status(200).send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

// File downloading
exports.downloadFile = (req, res) => {
  const buffer = fs.readFileSync(`F:/projects/express_react/upload/${req.query.value}`);
  const bufferBase64 = new Buffer(buffer);
  res.status(200).send(bufferBase64);
};

// Get uploaded files
exports.getUploadedFiles = (req, res) => {
  uploadData.findAll({ attributes: ['filename', 'createdAt'] }).then((files) => {
    res.send(files);
  });
};
