import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";

export default function LandingPage() {
  const [ticketData, setTicketData] = useState([]);
  const [ticketTypeData, setTicketTypeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState({
    ticket_id: "",
    package_event: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(searchInput);
    if (!searchInput.package_event && searchInput.ticket_id) {
      console.log("Package Event Empty!");
      setIsLoading(true);
      axiosApi
        .get(`/getTickets?ticket_id=${searchInput.ticket_id}`)
        .then((data) => {
          setTicketData(data.data);
        })
        .finally(() => setIsLoading(false));
    } else if (!searchInput.ticket_id && searchInput.package_event) {
      console.log("Ticket ID Empty!");
      setIsLoading(true);
      axiosApi
        .get(`/getTickets?package_event=${searchInput.package_event}`)
        .then((data) => {
          setTicketData(data.data);
        })
        .finally(() => setIsLoading(false));
    } else if (searchInput.package_event && searchInput.ticket_id) {
      setIsLoading(true);
      axiosApi
        .get(
          `/getTickets?package_event=${searchInput.package_event}&ticket_id=${searchInput.ticket_id}`
        )
        .then((data) => {
          setTicketData(data.data);
        })
        .finally(() => setIsLoading(false));
    }
    setSearchInput({ ticket_id: "", package_event: "" });
  }

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    setSearchInput({
      ...searchInput,
      [name]: value,
    });
  }

  function resetList(event) {
    axiosApi
      .get("/getTickets")
      .then((data) => {
        setTicketData(data.data);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get("/getTickets")
      .then((data) => {
        setTicketData(data.data);
      })
      .finally(() => setIsLoading(false));

    axiosApi
      .get("/getTypes")
      .then((data) => {
        setTicketTypeData(data.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <MDSpinner />;
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <div class="row ">
          <div class="col-md-6">
            <div
              class="card mx-auto mt-5"
              style={{ width: "30rem", height: "8rem" }}
            >
              <div class="card-body">
                <h2 class="card-text">Total Ticket :</h2>
                <h3 class="card-text pt-2">{ticketData?.length}</h3>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div
              class="card mx-auto mt-5"
              style={{ width: "30rem", height: "8rem" }}
            >
              <div class="card-body">
                <h2 class="card-text">Total Ticket Type :</h2>
                <h3 class="card-text pt-2">{ticketTypeData?.length}</h3>
              </div>
            </div>
          </div>
        </div>
        <h2 className="mt-4">Ticket List : </h2>
        <h4>Search By Ticket ID Or/And Package Event</h4>
        <form method="post" onSubmit={handleSubmit} className="pb-3">
          <div class="row ">
            <div class="col-md-6">
              <div class="input-group">
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Input Ticket ID..."
                  name="ticket_id"
                  onChange={handleChange}
                  value={searchInput.ticket_id}
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-group">
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Input Package Event..."
                  name="package_event"
                  onChange={handleChange}
                  value={searchInput.package_event}
                />
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-outline-primary mt-3">
            Search
          </button>
        </form>

        {/* <div class="col-md-6">
            <h4>Search By Package Event</h4>
            <form method="post" onSubmit={handleSubmit} className="pb-3">
              <div class="input-group">
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Input Package Event..."
                  name="package_event"
                  onChange={handleChange}
                  value={searchInput.package_event}
                />
                <button type="submit" class="btn btn-outline-primary">
                  Search
                </button>
              </div>
            </form>
          </div> */}

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => {
            resetList();
          }}
        >
          Reset List
        </button>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Ticket ID</th>
              <th scope="col">Package Event</th>
              <th scope="col">Name</th>
              <th scope="col">Package Date</th>
            </tr>
          </thead>
          {ticketData.map((el, idx) => {
            return (
              <tbody key={el.id}>
                <tr>
                  <td>{el?.Ticket_id}</td>
                  <td>{el?.Package_event}</td>
                  <td>{el?.Name}</td>
                  <td>{el.type?.Package_date}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
}
