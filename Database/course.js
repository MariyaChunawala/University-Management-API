const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
    {
        id : Number,
        name : String,
        department_id : Number,
    }
);

const CourseModel = mongoose.model("courses", courseSchema);

module.exports = CourseModel;