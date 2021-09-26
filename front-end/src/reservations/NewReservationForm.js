import React from "react";
import { Link } from "react-router-dom";

export default function NewReservationForm() {
  async function submitHandler(e) {
    e.preventDefault();

    const newReservation = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      mobile_number: e.target.mobile_number.value,
      reservation_date: e.target.reservation_date.value,
      reservation_time: e.target.reservation_time.value,
      people: e.target.people.value,
      created_at: e.target.reservation_time.value,
      updated_at: e.target.reservation_time.value,
    };

    console.log(newReservation);
    // try {
    //   await createCard(deckId, card);
    //   alert("Success");
    // } catch (error) {
    //   console.log(error);
    // }
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="grid">
          <div className="row">
            <div className="col">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
                placeholder="First name"
                aria-label="First name"
              />
            </div>
            <div className="col">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
                placeholder="Last name"
                aria-label="Last name"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="mobile_number" className="form-label">
              Mobile Number
            </label>
            <input
              name="mobile_number"
              type="text"
              className="form-control"
              id="phone-number"
              placeholder="XXX-XXX-XXXX"
            />
          </div>

          <div>
            <label htmlFor="reservation_date" className="form-label">
              Date of reservation
            </label>
            <input
              name="reservation_date"
              type="date"
              id="reservation_date"
              className="form-control"
            />
          </div>

          <div>
            <label
              htmlFor="reservation_time"
              name="reservation_time"
              className="form-label"
            >
              Time of reservation
            </label>
            <input type="time" id="reservation_time" className="form-control" />
          </div>

          <div>
            <label htmlFor="people">Party Size(1-10):</label>

            <input type="number" id="people" name="people" min="1" max="10" />
          </div>

          <div
            className="d-flex justify-content-between"
            role="group"
            aria-label="Basic example"
          >
            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            <Link to="/" type="button" className="btn btn-danger">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
