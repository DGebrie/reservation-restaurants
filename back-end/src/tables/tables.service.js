const knex = require("../db/connection");

const tableName = "tables";

const ReservationsServices = {
  list() {
    return knex(tableName).select("*");
  },

  create(table) {
    return knex(tableName).insert(table);
  },

//   listReservationsByDate(date) {
//     return knex(tableName)
//       .select("*")
//       .where("reservation_date", date)
//       .orderBy("reservation_time", "asc");
//   },
};

module.exports = ReservationsServices;
