import React, { useState } from "react";
import ReservationRow from "../dashboard/ReservationRow";
import { listReservations } from "../utils/api";

export default function Search() {
  const [mobileNumber, setMobileMNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  function handleChange({ target }) {
    setMobileMNumber(target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const abortController = new AbortController();

    setError(null);

    listReservations({ mobile_number: mobileNumber }, abortController.signal)
      .then(setReservations)
      .catch(setError);

    return () => abortController.abort();
  }

  const searchResultsJSX = () => {
    return reservations.length > 0 ? (
      reservations.map((reservation) => (
        <ReservationRow
          key={reservation.reservation_id}
          reservation={reservation}
        />
      ))
    ) : (
      <p> No reservations found</p>
    );
  };

  // function handleCancel() {
  //   if (
  //     window.confirm(
  //       "Do you want to cancel this reservation? This cannot be undone."
  //     )
  //   ) {
  //     window.location.reload();
  //   }
  // }

  return (
    <>
      <form>
        <label htmlFor="mobile_number">Enter a customer's phone number:</label>
        <input
          name="mobile_number"
          id="mobile_number"
          type="tel"
          onChange={handleChange}
          value={mobileNumber}
          required
        />

        <button type="submit" onClick={handleSubmit}>
          Find
        </button>
      </form>

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">People</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{searchResultsJSX()}</tbody>
      </table>
    </>
  );
}
