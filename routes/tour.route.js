const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller.js");
const viewCount = require("../middlewares/viewCount.js");

router.route("/").get(tourController.getTours).post(tourController.createTour);
router.route("/trending").get(tourController.getTrendingTour);
router.route("/cheapest").get(tourController.getCheapestTour);
router
  .route("/:id")
  .get(viewCount, tourController.getTourById)
  .patch(tourController.updateTourById)
  .delete(tourController.deleteTourById);
module.exports = router;
