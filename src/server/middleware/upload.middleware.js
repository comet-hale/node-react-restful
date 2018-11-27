const multer = require('multer');

const storage = multer.diskStorage({
  destination: './upload/',
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  }
});

module.exports = multer({ storage });
