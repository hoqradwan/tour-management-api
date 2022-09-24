const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller.js");

router.route("/").get(tourController.getTours).post(tourController.createTour);
router.route("/:id").get(tourController.getTourById).delete(tourController.deleteTourById)
module.exports = router;
