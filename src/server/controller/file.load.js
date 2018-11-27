const db = require('../models');
const token = require('../middleware/jwt.middleware');

const uploadData = db.uploadData;

// File uploading
exports.upload = (req, res) => {
  if (token.verifyToken(req.headers.authorization) !== null) {
    const filePath = `${req.protocol}://${req.domain}/${req.file.filename}`;
    uploadData
      .create({
        filename: req.body.filename,
        url: filePath
      })
      .then((user) => {
        res.send(user);
      });
  } else {
  }
};

// File downloading
