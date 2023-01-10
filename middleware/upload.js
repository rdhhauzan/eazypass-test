const multer = require("multer");

var storage = multer.diskStorage({
  // ! Destination where the csv store, same as in controller
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    // ! Define file name format
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

let uploadFile = multer({ storage: storage });
module.exports = uploadFile;
