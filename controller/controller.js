const fs = require("fs");
const csv = require("fast-csv");
const axios = require("axios");
const dbUrl = "http://localhost:4040";

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
          ticket.forEach((el, idx) => {
            let type;
            if (el["Package Event"] == "Day 1") {
              type = 1;
            } else if (el["Package Event"] == "Day 2") {
              type = 2;
            } else if (el["Package Event"] == "2 Day Pass") {
              type = 3;
            }
            // console.log(el["Package Event"]);
            axios.post(`${dbUrl}/tickets`, {
              Ticket_id: el["Ticket Id"],
              Package_event: el["Package Event"],
              Name: el["Name"],
              typeId: type,
            });
          });
          res.status(200).send(ticket);
        });
    } catch (error) {
      console.log(error);
    }
  }

  static async getTicketType(req, res) {
    try {
      await axios.get(`${dbUrl}/types`).then((data) => {
        res.status(200).send(data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async previewUploadCsv(req, res) {
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
          res.status(200).send(ticket);
        });
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllTickets(req, res) {
    try {
      await axios.get(`${dbUrl}/tickets`).then((data) => {
        res.status(200).send(data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
