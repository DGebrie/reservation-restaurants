import React from "react";

import { Link, useHistory } from "react-router-dom";

export default function EditFunction() {
  const history = useHistory();
  return (
    <h1>
      Edit Reservation: copy NewReservationForm component when complete + add
      defaultValue
    </h1>

    // <form
    // // onSubmit={submitHandler}
    // >
    //   <div className="grid">
    //     <div className="row">
    //       <div className="col">
    //         <label htmlFor="first_name" className="form-label">
    //           First Name
    //         </label>
    //         <input
    //           //   onChange={handleChange}
    //           //   value={formData.first_name}
    //           type="text"
    //           name="first_name"
    //           id="first_name"
    //           className="form-control"
    //           placeholder="First name"
    //           aria-label="First name"
    //         />
    //       </div>
    //       <div className="col">
    //         <label htmlFor="last_name" className="form-label">
    //           Last Name
    //         </label>
    //         <input
    //           //   onChange={handleChange}
    //           //   value={formData.last_name}
    //           type="text"
    //           name="last_name"
    //           id="last_name"
    //           className="form-control"
    //           placeholder="Last name"
    //           aria-label="Last name"
    //         />
    //       </div>
    //     </div>

    //     <div className="mb-3">
    //       <label htmlFor="mobile_number" className="form-label">
    //         Mobile Number
    //       </label>
    //       <input
    //         // onChange={handleChange}
    //         // value={formData.mobile_number}
    //         name="mobile_number"
    //         type="tel"
    //         className="form-control"
    //         id="mobile_number"
    //         placeholder="XXX-XXX-XXXX"
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="reservation_date" className="form-label">
    //         Date of reservation
    //       </label>
    //       <input
    //         // onChange={handleChange}
    //         // value={formData.reservation_date}
    //         name="reservation_date"
    //         type="date"
    //         id="reservation_date"
    //         className="form-control"
    //       />
    //     </div>

    //     <div>
    //       <label
    //         htmlFor="reservation_time"
    //         name="reservation_time"
    //         className="form-label"
    //       >
    //         Time of reservation
    //       </label>
    //       <input
    //         // onChange={handleChange}
    //         // value={formData.reservation_time}
    //         name="reservation_time"
    //         type="time"
    //         id="reservation_time"
    //         className="form-control"
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="people">Party Size(1-10):</label>

    //       <input
    //         // onChange={handleChange}
    //         // value={formData.people}
    //         type="number"
    //         id="people"
    //         name="people"
    //         min="1"
    //         max="10"
    //       />
    //     </div>

    //     <div
    //       className="d-flex justify-content-between"
    //       role="group"
    //       aria-label="Basic example"
    //     >
    //       <button type="submit" className="btn btn-primary">
    //         Submit
    //       </button>

    //       <Link
    //         to="/"
    //         className="btn btn-danger"
    //         type="button"
    //         onClick={history.goBack}
    //       >
    //         Cancel
    //       </Link>
    //     </div>
    //   </div>
    // </form>
  );
}
