// Express Framework
const express = require('express');
const app = express.Router();


const CollegeModel = require("./Database/college");

/*
    Routes : /
    d]Description : To get all colleges
    Parameter : NONE
    Method : GET
*/
app.get("/", async (request, response) =>{
    const colleges = await CollegeModel.find();
    return response.json({Colleges : colleges});
});

/*
    Routes : /
    d]Description : To get specific college
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
    d]Description : To get specific colleges based on department
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
    d]Description : To get specific colleges based on course
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

module.exports = app;