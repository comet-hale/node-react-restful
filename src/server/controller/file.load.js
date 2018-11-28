const db = require('../models');
const token = require('../middleware/jwt.middleware');

const uploadData = db.uploadData;

// File uploading
exports.upload = (req, res) => {
  if (token.verifyToken(req.headers.authorization) !== null) {
    const fileUrl = `${req.file.filename}`;
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
  } else {
  }
};

// File downloading
