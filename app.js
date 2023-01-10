const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const Controller = require("./controller/controller");
const upload = require("./middleware/upload");

// ! Define base Directory
global.__basedir = __dirname + "/";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/uploadcsv", upload.single("file"), Controller.uploadCsv);
app.get("/getTypes", Controller.getTicketType);
app.post("/preview", upload.single("file"), Controller.previewUploadCsv);
app.get("/getTickets", Controller.getAllTickets);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
