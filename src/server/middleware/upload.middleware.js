const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: './upload/',
    filename(req, file, cb) {
      cb(null, `${file.originalname}`);
    }
  })
});

module.exports.uploadFile = upload.single('avatar');
