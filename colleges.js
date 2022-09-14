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
    const getAllColleges = await CollegeModel.find();
    return response.json({Colleges : getAllColleges});
});

/*
    Routes : /
    Description : To get specific college
    Parameter : id
    Method : GET
*/
app.get("/:id", async (request, response) =>{
    const getSpecificColleges = await CollegeModel.findOne(
        {id : parseInt(request.params.id)}
    );
    if(!getSpecificColleges){
        return response.json({error : `No Specific college find with id ${request.params.id}`});
    }
    return response.json({Colleges : getSpecificColleges});
});

/*
    Routes : /department
    Description : To get specific colleges based on department
    Parameter : deparment
    Method : GET
*/
app.get("/department/:department", async (request, response) =>{
    const getSpecificColleges = await CollegeModel.find(
        {dep_name : request.params.department}
    );
    if(getSpecificColleges.length === 0){
        return response.json({error : `No Specific college find with department ${request.params.department}`});
    }
    return response.json({Colleges : getSpecificColleges});
});

/*
    Routes : /post
    Description : Add new college
    Parameter : NONE
    Method : POST
*/
app.post("/post", async (request, response) =>{
    const addNewCollege = await CollegeModel.create(request.body.newCollege);
    return response.json({Colleges : addNewCollege});
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
        {name : request.body.newCollegeName},
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
    const updatedDepartments = await DepartmentModel.findOneAndUpdate(
        {name : request.body.newDepartment},
        {$addToSet : {colleges_id : request.params.college_id}},
        {new : true}
    );

    return response.json({Colleges : updatedColleges, Department : updatedDepartments});
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
    Description : Delete a department from a college
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