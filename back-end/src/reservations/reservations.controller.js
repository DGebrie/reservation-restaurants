const ReservationsServices = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

async function validateDate() {
  const reserveDate = new Date(
    `${req.body.data.reservation_date}T${req.body.data.reservation_time}:00.000`
  );
  const todaysDate = new Date();

  if (reserveDate.getDay() === 2) {
    return next({
      status: 400,
      message: "'reservation_date' field: restauraunt is closed on tuesday",
    });
  }

  if (reserveDate < todaysDate) {
    return next({
      status: 400,
      message:
        "'reservation_date' and 'reservation_time' field must be in the future",
    });
  }

  if (
    reserveDate.getHours() < 10 ||
    (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)
  ) {
    return next({
      status: 400,
      message: "'reservation_time' field: restaurant is not open until 10:30AM",
    });
  }

  if (
    reserveDate.getHours() > 22 ||
    (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)
  ) {
    return next({
      status: 400,
      message: "'reservation_time' field: restaurant is closed after 10:30PM",
    });
  }

  if (
    reserveDate.getHours() > 21 ||
    (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)
  ) {
    return next({
      status: 400,
      message:
        "'reservation_time' field: reservation must be made at least an hour before closing (10:30PM)",
    });
  }

  next();
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(create), asyncErrorBoundary(validateDate)],
  listReservationsByDate: asyncErrorBoundary(listReservationsByDate),
};
