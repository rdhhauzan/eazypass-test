import Navbar from "../components/Navbar";
import { useEffect, useState, useRef } from "react";
import axiosApi from "../apis/axios";
import Swal from "sweetalert2";
import axios from "axios";
export default function Upload() {
  const myForm = useRef();
  const [selectedFile, setSelectedFile] = useState({
    file: "",
  });
  const [ticketData, setTicketData] = useState();

  const handleFileSelect = async (event) => {
    let { name, value } = event.target;
    if (name === "file") {
      let file = event.target.files[0];
      value = file;
    }
    setSelectedFile({ ...selectedFile, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log(myForm.current.buttonId);
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", selectedFile.file);
    try {
      if (myForm.current.buttonId == "upload") {
        await axios({
          method: "POST",
          url: "http://localhost:3001/uploadcsv",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
          body: FormData,
        })
          .then((data) => {
            Swal.fire({
              title: "Success!",
              icon: "success",
              text: "Upload Success!",
            });
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: err.response.data.message,
            });
          });
      } else if (myForm.current.buttonId == "preview") {
        await axios({
          method: "POST",
          url: "http://localhost:3001/preview",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
          body: FormData,
        }).then((data) => {
          setTicketData(data.data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <h1>Upload Page</h1>
      <form onSubmit={handleSubmit} ref={myForm}>
        <input
          type="file"
          onChange={handleFileSelect}
          name="file"
          accept={".csv"}
        />
        <button
          type="submit"
          value="Upload File"
          className="btn btn-primary"
          id="upload"
          onClick={(e) => (myForm.current.buttonId = e.target.id)}
        >
          Upload
        </button>
        <button
          type="submit"
          value="Preview File"
          className="btn btn-primary mx-3"
          id="preview"
          onClick={(e) => (myForm.current.buttonId = e.target.id)}
        >
          Preview
        </button>
      </form>
      {ticketData?.length > 0 ? (
        <table class="table table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">Ticket ID</th>
              <th scope="col">Package Event</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          {ticketData.map((el, idx) => {
            return (
              <tbody key={el["Ticket Id"]}>
                <tr>
                  <td>{el["Ticket Id"]}</td>
                  <td>{el["Package Event"]}</td>
                  <td>{el?.Name}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      ) : null}
    </>
  );
}
