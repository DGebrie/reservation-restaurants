import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";
import EditReservation from "../reservations/EditReservation";

import moment from "moment";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
export default function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [newDate, setNewDate] = useState(date);
  useEffect(loadDashboard, [newDate]);

  function previousDay() {
    const previous = moment(newDate).subtract(1, "days").format();
    setNewDate(previous);
  }

  function nextDay() {
    const next = moment(newDate).add(1, "days").format();
    setNewDate(next);
  }

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: newDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables().then(setTables);

    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3 justify-content-center">
        <h4 className="mb-0 justify-content-center">
          Reservations for {newDate}
        </h4>
      </div>
      <ErrorAlert error={reservationsError} />

      <div className="d-flex justify-content-between">
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Party Size</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.reservation_id}>
                  <td>{`${reservation.first_name} ${reservation.last_name}`}</td>
                  <td>{reservation.reservation_time}</td>
                  <td>{reservation.people}</td>
                  <td>{reservation.mobile_number}</td>

                  <Link
                    to={`/reservations/edit`}
                    className="btn btn-primary"
                    style={{ size: "24px" }}
                  >
                    Edit
                  </Link>
                  <button>Delete</button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Table</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr key={table.table_id}>
                  <td>{table.table_name}</td>
                  <td>{table.capacity}</td>

                  {/* <Link
                  to={`/reservations/edit`}
                  className="btn btn-primary"
                  style={{ size: "24px" }}
                > */}
                  <td>
                    <button> Edit </button>
                    {/* </Link> */}
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button onClick={previousDay}>Previous</button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setNewDate(moment().format())}
        >
          Today
        </button>
        <button onClick={nextDay}>Next</button>
      </div>
    </main>
  );
}
