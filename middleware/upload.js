const multer = require("multer");

const csvFilter = (req, file, cb) => {
  // ! Filter to upload only .csv file
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};

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

let uploadFile = multer({ storage: storage, fileFilter: csvFilter });
module.exports = uploadFile;
