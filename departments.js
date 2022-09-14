const express = require('express');
const app = express.Router();

const DepartmentModel = require('./Database/department');

/* 
    Route : /
    Description : To get all Department
    Parameters : NONE
    Method : GET
*/
app.get("/", async (request, response) =>{
    const getAllDepartments = await DepartmentModel.find();
    return response.json({Departments : getAllDepartments});
});

/* 
    Route : /
    Description : To get specific department
    Parameters : id
    Method : GET
*/
app.get("/:id", async (request, response) =>{
    const getSpecificDepartment = await DepartmentModel.findOne(
        {id : request.params.id}
    );
    if(!getSpecificDepartment){
        return response.json({error : `No specific Department available with id ${request.params.id}`});
    }
    return response.json({Departments : getSpecificDepartment});
});

/* 
    Route : /course
    Description : To get specific department based on course
    Parameters : id
    Method : GET
*/
app.get("/course/:id", async (request, response) =>{
    const getSpecificDepartment = await DepartmentModel.findOne(
        {courses : request.params.id}
    );
    if(!getSpecificDepartment){
        return response.json({error : `No specific Department available with course ${request.params.id}`});
    }
    return response.json({Departments : getSpecificDepartment});
});

/* 
    Route : /post
    Description : Add new department
    Parameters : None
    Method : POST
*/
app.post("/post", async (request, response) =>{
    const addNewDepartment = await DepartmentModel.create(request.body.newDepartment)
    return response.json({Departments : addNewDepartment});
});

module.exports = app;