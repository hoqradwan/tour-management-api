const { restart } = require("nodemon");
const Tour = require("../models/Tour.js")


exports.getToursService = async()=>{
    const tours  = await Tour.find({})
    return tours;
}
exports.createTourService = async(data) =>{
    const tour = await Tour.create(data)
    return tour;
}
exports.deleteTourByIdService = async(id) =>{
    const result = await Tour.deleteOne({_id: id})
    return result;
}
exports.getTourByIdService = async(id)=>{
    const result = await Tour.findById({_id:id})
    return result;
}