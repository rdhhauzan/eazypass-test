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
      // ! Define where the csv to store
      let path = __basedir + "/uploads/" + req.file.filename;

      // ! Read CSV File, and send it to db
      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          ticket.push(row);
        })
        .on("end", () => {
          if (ticket.length == 1) {
            console.log("satu");
          } else {
            console.log("lebih dari satu");
          }
          console.log(ticket.length);
          res.status(200).send(ticket);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
