const {
  getToursService,
  createTourService,
  deleteTourByIdService,
  getTourByIdService,
  updateTourByIdService,
  getCheapestTourService,
  getTrendingTourService,
} = require("../services/tour.services");

exports.getTours = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);
    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if(req.query.page){
      const {page=1, limit=2} = req.query;
      const skip = (page -1)*parseInt(limit)
      queries.skip = skip;
      queries.limit = parseInt(limit)
    }

    const tours = await getToursService(filters, queries);

    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    // save or create

    const result = await createTourService(req.body);

    result.logger();

    res.status(200).json({
      status: "success",
      messgae: "Data inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not inserted ",
      error: error.message,
    });
  }
};
exports.deleteTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteTourByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "couldn't delete the tour",
      });
    }

    res.status(200).json({
      status: "success",
      messgae: "Tour Deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the tour",
      error: error.message,
    });
  }
};
exports.getTourById = async (req, res, next) => {
  try {
    // res.send("tour details found")
    const { id } = req.params;
    const result = await getTourByIdService(id);

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the tour",
      error: error.message,
    });
  }
};
exports.updateTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateTourByIdService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully updated the tour",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the tour",
      error: error.message,
    });
  }
};
exports.getTrendingTour = async (req, res, next) => {
  try {
    const trendingTours = await getTrendingTourService();

    res.status(200).json({
      status: "success",
      data: trendingTours,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't find trending tours",
      error: error.message,
    });
  }
};
exports.getCheapestTour = async (req, res, next) => {
  try {
    const cheapestTours = await getCheapestTourService();
    res.status(200).json({
      status: "success",
      data: cheapestTours,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't find cheapest tours",
      error: error.message,
    });
  }
};
