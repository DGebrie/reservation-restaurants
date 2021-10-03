/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");

router
  .route("/")
  .get(controller.listReservationsByDate)
  .post(controller.create);

module.exports = router;
