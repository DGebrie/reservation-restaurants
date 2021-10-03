const knex = require("../db/connection");

const ReservationsServices = {
  list() {
    return knex("reservations").select("*");
  },

  create(reservation) {
    return knex("reservations").insert(reservation);
  },

  listReservationsByDate(date) {
    return knex("reservations").select("*").where("reservation_date", date);
  },
};

module.exports = ReservationsServices;
