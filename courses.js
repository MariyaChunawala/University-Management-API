// Express Framework
const express = require('express');
const app = express.Router();

// Models
const CourseModel = require("./Database/course");
const DepartmentModel = require("./Database/department");

/*
    Routes : /
    Description : To get all courses
    Parameter : NONE
    Method : GET
*/
app.get("/", async (request, response) =>{
    const getAllCourses = await CourseModel.find();
    return response.json({Courses : getAllCourses});
});

/*
    Routes : /
    Description : To get specific course
    Parameter : id
    Method : GET
*/
app.get("/:id", async (request, response) =>{
    const getSpecificCourse = await CourseModel.findOne(
        {id : parseInt(request.params.id)}
    );
    if(!getSpecificCourse){
        return response.json({error : `No Specific course find with id ${request.params.id}`});
    }
    return response.json({Courses : getSpecificCourse});
});

/*
    Routes : /department
    Description : To get specific course based on Department
    Parameter : id
    Method : GET
*/
app.get("/department/:id", async (request, response) =>{
    const getSpecificCourse = await CourseModel.find(
        {department_id : parseInt(request.params.id)}
    );
    if(!getSpecificCourse){
        return response.json({error : `No Specific course find with department id ${request.params.id}`});
    }
    return response.json({Courses : getSpecificCourse});
});

/*
    Routes : /post
    Description : add new course
    Parameter : NONE
    Method : POST
*/
app.post("/post", async (request, response) =>{
    const addNewCourse = await CourseModel.create(request.body.newCourse)
    return response.json({Courses : addNewCourse});
});
/*
    Routes : /update
    Description : update course name
    Parameter : id
    Method : PUT
*/
app.put("/update/:id", async (request, response) =>{
    const updatedCourse = await CourseModel.findOneAndUpdate(
        {id : parseInt(request.params.id)},
        {name : request.body.newCourseName},
        {new : true}
    )
    return response.json({Courses : updatedCourse});
});

/*
    Routes : /delete
    Description : Delete a course
    Parameter : id
    Method : DELETE
*/
app.delete("/delete/:id", async (request, response) =>{
    const updatedCourse = await CourseModel.findOneAndDelete(
        {id : parseInt(request.params.id)},
    )
    return response.json({Courses : updatedCourse});
});

module.exports = app;