const Tour = require("../models/Tour.js");

exports.getToursService = async (filters, queries) => {
  const tours = await Tour.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const total = await Tour.countDocuments(filters);
  const page = Math.ceil(total/queries.limit)
  return {total,page, tours};
};
exports.createTourService = async (data) => {
  const tour = await Tour.create(data);
  return tour;
};
exports.deleteTourByIdService = async (id) => {
  const result = await Tour.deleteOne({ _id: id });
  return result;
};
exports.getTourByIdService = async (id) => {
  const result = await Tour.findById({ _id: id });
  return result;
};
exports.updateTourByIdService = async (tourId, data) => {
  /*  const result = await Tour.updateOne(
    { _id: tourId },
    { $inc: data },
    { runValidators: true }
  ); */
  const result = await Tour.findOneAndUpdate(tourId, data);
  return result;
};
exports.getTrendingTourService = async () => {
  const tours = await Tour.find({});
  return tours;
};
exports.getCheapestTourService = async () => {
  const tour = await Tour.find({}).sort({ price: 1 });
  const cheapestTours = tour.slice(0, 3);
  return cheapestTours;
};
