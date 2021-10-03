const ReservationsServices = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  try {
    const data = await ReservationsServices.list();
    res.json({ data });
  } catch (error) {
    next({ status: 400, message: error });
  }
}

async function listReservationsByDate(req, res, next) {
  const { date } = req.query;
  try {
    const data = await ReservationsServices.listReservationsByDate(date);
    return res.json({ data });
  } catch (error) {
    next({ status: 400, message: error });
  }
}

async function create(req, res, next) {
  try {
    const newReservation = req.body;
    await ReservationsServices.create(newReservation);
    res.status(201).send({ data: newReservation });
  } catch (error) {
    next({ status: 400, message: error });
  }
}

module.exports = {
  list,
  create,
  listReservationsByDate,
};
