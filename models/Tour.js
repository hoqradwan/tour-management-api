const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this tour"],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"]
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"]
    },
    place: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
         values:   ["available", "not-available", "discontinued"],
         message: "status cannot be {VALUE}"
        }
    }
}, {
    timestamps: true
})
/* tourSchema.pre('save', function(next){
    console.log(' Before saving data');

    next();
})
tourSchema.methods.logger = function(){
    console.log(`Data is saved for ${this.name}`)
} */
const Tour = mongoose.model("Tour", tourSchema)

module.exports = Tour;


