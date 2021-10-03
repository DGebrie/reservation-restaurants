const ReservationsServices = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await ReservationsServices.list();
  res.json({ data });
}

async function listReservationsByDate(req, res, next) {
  const { date } = req.query;
  const data = await ReservationsServices.listReservationsByDate(date);

  return res.json({ data });
}

async function create(req, res, next) {
  const newReservation = req.body;
  await ReservationsServices.create(newReservation);
  res.status(201).send({ data: newReservation });
}

module.exports = {
  list,
  create,
  listReservationsByDate,
};
