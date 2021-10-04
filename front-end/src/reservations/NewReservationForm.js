import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createReservation } from "../utils/api.js";
import { today, asDateString } from "../utils/date-time.js";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NewReservationForm() {
  const [newDate, setNewDate] = useState();
  const [newTime, setNewTime] = useState();
  const [minTime, setMinTime] = useState();
  const [disabled, setDisabled] = useState(true);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });
  const history = useHistory();

  async function validateDate(date) {
    const currDate = Date.parse(new Date());
    const selectedDate = Date.parse(date);

    const selectedDay = date.getDay();

    console.log({ currDate, selectedDate });
    if (currDate > selectedDate) {
      alert("Cannot select past dates.");
    } else if (selectedDay === 2) {
      alert("Closed on Tues");
    } else if (currDate === selectedDate) {
      setNewDate(date);
      setMinTime(new Date());
      setDisabled(false);
      setNewTime(null);
    } else {
      setNewDate(date);
      setMinTime(new Date().setHours(10, 30));
      setDisabled(false);
      setNewTime(null);
    }
  }

  function handleChange({ target }) {
    // if (target.name === "reservation_date") {
    //   if (target.value < today()) {
    //     alert("Cannot select past dates.");
    //   }
    //   if (new Date(target.value).getDay() === 1) {
    //     alert("Closed on Tues");
    //   }
    // }
    // if (target.name === "reservation_time") {
    //   // console.log(target.value.getHours());
    //   // console.log(moment(target.value).format("LT"));
    //   // console.log(target.value < moment()._i);
    //   // const selected = new Date(target.value);
    //   // if (target.value < moment().format("LT")) {
    //   //   alert("cannot select past time");
    //   // }
    // }
    // setFormData({ ...formData, [target.name]: target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();

    const abortController = new AbortController();

    const newReservation = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      mobile_number: e.target.mobile_number.value,
      reservation_date: e.target.reservation_date.value,
      reservation_time: e.target.reservation_time.value,
      people: e.target.people.value,
      created_at: e.target.reservation_date.value,
      updated_at: e.target.reservation_date.value,
    };

    try {
      await createReservation(newReservation, abortController.signal);
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }

    history.push(`/dashboard?date=${formData.reservation_date}`);
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
                onChange={handleChange}
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
                onChange={handleChange}
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
              onChange={handleChange}
              name="mobile_number"
              type="tel"
              className="form-control"
              id="mobile_number"
              placeholder="XXX-XXX-XXXX"
            />
          </div>

          <div>
            <label htmlFor="reservation_date" className="form-label">
              Date of reservation
            </label>

            <DatePicker
              selected={newDate}
              onChange={(date) => validateDate(date)}
              filterDate={(date) => date.getDay() !== 2}
              minDate={new Date()}
              name="reservation_date"
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
            <DatePicker
              selected={newTime}
              onChange={(time) => setNewTime(time)}
              minTime={minTime}
              maxTime={new Date().setHours(21, 30)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              disabled={disabled}
              name="reservation_time"
            />
          </div>

          <div>
            <label htmlFor="people">Party Size(1-10):</label>

            <input
              onChange={handleChange}
              // value={formData.people}
              type="number"
              id="people"
              name="people"
              min="1"
              max="10"
            />
          </div>

          <div
            className="d-flex justify-content-between"
            role="group"
            aria-label="Basic example"
          >
            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            <Link
              to="/"
              className="btn btn-danger"
              type="button"
              onClick={history.goBack}
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
