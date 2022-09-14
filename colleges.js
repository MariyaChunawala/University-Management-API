// Express Framework
const express = require('express');
const app = express.Router();

// Models
const CollegeModel = require("./Database/college");
const DepartmentModel = require("./Database/department");

/*
    Routes : /
    Description : To get all colleges
    Parameter : NONE
    Method : GET
*/
app.get("/", async (request, response) =>{
    const colleges = await CollegeModel.find();
    return response.json({Colleges : colleges});
});

/*
    Routes : /
    Description : To get specific college
    Parameter : id
    Method : GET
*/
app.get("/:id", async (request, response) =>{
    const colleges = await CollegeModel.findOne(
        {id : parseInt(request.params.id)}
    );
    if(!colleges){
        return response.json({Colleges : `No Specific college find with id ${request.params.id}`});
    }
    return response.json({Colleges : colleges});
});

/*
    Routes : /deparment
    Description : To get specific colleges based on department
    Parameter : deparment
    Method : GET
*/
app.get("/deparment/:department", async (request, response) =>{
    const colleges = await CollegeModel.find(
        {dep_name : request.params.department}
    );
    if(!colleges){
        return response.json({Colleges : `No Specific college find with department ${request.params.department}`});
    }
    return response.json({Colleges : colleges});
});

/*
    Routes : /course
    Description : To get specific colleges based on course
    Parameter : course
    Method : GET
*/
app.get("/course/:course", async (request, response) =>{
    const colleges = await CollegeModel.find(
        {courses : request.params.course}
    );
    if(!colleges){
        return response.json({Colleges : `No Specific college find with course ${request.params.course}`});
    }
    return response.json({Colleges : colleges});
});

/*
    Routes : /post
    Description : Add new college
    Parameter : NONE
    Method : POST
*/
app.post("/post", async (request, response) =>{
    const addCollege = await CollegeModel.create(request.body.newCollege);
    return response.json({Colleges : addCollege});
});

/*
    Routes : /update
    Description : update college name
    Parameter : id
    Method : PATCH
*/
app.patch("/update/:id", async (request, response) =>{
    const updatedColleges = await CollegeModel.findOneAndUpdate(
        {id : parseInt(request.params.id)},
        {name : request.body.newName},
        {new : true}
    );

    return response.json({Colleges : updatedColleges});
});

/*
    Routes : /update/department
    Description : Update or add new department
    Parameter : college_id
    Method : PUT
*/
app.put("/update/department/:college_id", async (request, response) =>{
    // Update college Database
    const updatedColleges = await CollegeModel.findOneAndUpdate(
        {id : parseInt(request.params.college_id)},
        {$addToSet : {dep_name : request.body.newDepartment}},
        {new : true}
    );

    // Update Department Database
    const updatedDepartment = await DepartmentModel.findOneAndUpdate(
        {name : request.body.newDepartment},
        {$addToSet : {colleges_id : request.params.college_id}},
        {new : true}
    );

    return response.json({Colleges : updatedColleges, Department : updatedDepartment});
});

/*
    Routes : /delete
    Description : Delete a college
    Parameter : id
    Method : DELETE
*/
app.delete("/delete/:id", async (request, response) =>{
    const updatedColleges = await CollegeModel.findOneAndDelete(
        {id : parseInt(request.params.id)},
    );

    return response.json({Colleges : updatedColleges});
});

/*
    Routes : /delete/department
    Description : Delete a college
    Parameter : college_id
    Method : DELETE
*/
app.delete("/delete/department/:college_id", async (request, response) =>{
    // Update College Database
    const updatedColleges = await CollegeModel.findOneAndUpdate(
        {id : parseInt(request.params.college_id)},
        {$pull : {dep_name : request.body.department}},
        {new : true}
    );

    // Update Department Database
    const updatedDepartment = await DepartmentModel.findOneAndUpdate(
        {name : request.body.department},
        {$pull : {colleges_id : parseInt(request.params.college_id)}},
        {new : true}
    );

    return response.json({Colleges : updatedColleges, Departments : updatedDepartment});
});

module.exports = app;