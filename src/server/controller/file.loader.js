const db = require('../models');

const uploadData = db.uploadData;

// File uploading
exports.upload = (req, res) => {
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
};

// File downloading
