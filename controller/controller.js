const fs = require("fs");
const csv = require("fast-csv");
const axios = require("axios");

class Controller {
  static async uploadCsv(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send({ message: "Please upload a CSV File!" });
      }

      let ticket = [];
      let path = __basedir + "/assets/uploads/" + req.file.filename;

      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          ticket.push(row);
        })
        .on("end", () => {
          console.log(ticket);
          res.status(200).send(ticket);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
