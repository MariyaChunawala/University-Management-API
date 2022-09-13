const mongoose = require("mongoose");

const collegeScheme = mongoose.Schema({
    id : Number, 
    name : String,
    dep_name : [String],
    instructors : Number,
    courses : [Number]
});

const CollegeModel = mongoose.model("colleges", collegeScheme);

module.exports = CollegeModel;