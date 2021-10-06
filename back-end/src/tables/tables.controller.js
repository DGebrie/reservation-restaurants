const knex = require("../db/connection");

const TablesServices = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  try {
    const data = await TablesServices.list();
    res.json({ data });
  } catch (error) {
    next({ status: 400, message: error });
  }
}

// async function listTablesByDate(req, res, next) {
//   const { date } = req.query;
//   try {
//     const data = await TablesServices.listTablesByDate(date);
//     return res.json({ data });
//   } catch (error) {
//     next({ status: 400, message: error });
//   }
// }

async function create(req, res, next) {
  try {
    const newTable = req.body.data;

    console.log(newTable);
    await TablesServices.create(newTable);
    res.status(201).send({ data: newTable });
  } catch (error) {
    next({ status: 400, message: error });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create),
  //   listReservationsByDate: asyncErrorBoundary(listReservationsByDate),
};
