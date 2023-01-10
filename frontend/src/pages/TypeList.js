import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import MDSpinner from "react-md-spinner";
import axiosApi from "../apis/axios";

export default function TypeList() {
  const [ticketTypeData, setTicketTypeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
      <h1 className="mt-3">Ticket Type List</h1>

      <div className="row justify-content-center">
        <div className="col-auto">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Package Name</th>
                <th scope="col">Package Date</th>
              </tr>
            </thead>
            {ticketTypeData.map((el, idx) => {
              return (
                <tbody key={el.id}>
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{el?.Package_name}</td>
                    <td>{el?.Package_date}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
