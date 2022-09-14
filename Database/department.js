const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
    {
        id : Number,
        name : String,
        colleges_id : [Number],
        courses : [Number],
    }
);

const DepartmentModel = mongoose.model("departments", departmentSchema);

module.exports = DepartmentModel;