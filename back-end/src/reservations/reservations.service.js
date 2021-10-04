const knex = require("../db/connection");

const tableName = "reservations";

const ReservationsServices = {
  list() {
    return knex(tableName).select("*");
  },

  create(reservation) {
    return knex(tableName).insert(reservation);
  },

  listReservationsByDate(date) {
    return knex(tableName)
      .select("*")
      .where("reservation_date", date)
      .orderBy("reservation_time", "asc");
  },
};

module.exports = ReservationsServices;
