const express = require('express');
const app = express.Router();

// Models
const DepartmentModel = require('./Database/department');
const CourseModel = require('./Database/course');

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

/* 
    Route : /update
    Description : update Department name
    Parameters : id
    Method : PUT
*/
app.put("/update/:id", async (request, response) =>{
    const updatedDepartment = await DepartmentModel.findOneAndUpdate(
        {id : parseInt(request.params.id)},
        {name : request.body.newDepartmentName},
        {new : true}
    )
    return response.json({Departments : updatedDepartment});
});

/* 
    Route : /update/course
    Description : update or add new course
    Parameters : department_id
    Method : PUT
*/
app.put("/update/course/:department_id", async (request, response) =>{
    // update department Database
    const updatedDepartment = await DepartmentModel.findOneAndUpdate(
        {id : parseInt(request.params.department_id)},
        {$addToSet : {courses : request.body.newCourse}},
        {new : true}
    )

    // update Course Database
    const updatedCourse = await CourseModel.findOneAndUpdate(
        {id : request.body.newCourse},
        {department_id : parseInt(request.params.department_id)},
        {new : true}
    );
    return response.json({Departments : updatedDepartment, Courses : updatedCourse});
});

/* 
    Route : /delete
    Description : Delete a department
    Parameters : id
    Method : DELETE
*/
app.delete("/delete/:id", async (request, response) =>{
    const updatedDepartment = await DepartmentModel.findOneAndDelete(
        {id : parseInt(request.params.id)}
    );
    return response.json({Departments : updatedDepartment});
});

/* 
    Route : /delete/course
    Description : Delete a course from department
    Parameters : department_id
    Method : DELETE
*/
app.delete("/delete/course/:department_id", async (request, response) =>{
    // update department Database
    const updatedDepartment = await DepartmentModel.findOneAndUpdate(
        {id : parseInt(request.params.department_id)},
        {$pull : {courses : request.body.course}},
        {new : true}
    )

    // update Course Database
    const updatedCourse = await CourseModel.findOneAndUpdate(
        {id : request.body.course},
        {department_id : 0},
        {new : true}
    );
    return response.json({Departments : updatedDepartment, Courses : updatedCourse});
});

module.exports = app;