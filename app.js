// Express Framework
const express = require('express');
const app = express();
app.use(express.json());

// dotenv package
require("dotenv").config();

// Connect with Mongodb with the help of mongoose 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL).then(()=> console.log('connection established'))

// APIs Routes
const colleges = require("./colleges");
app.use("/colleges", colleges)

app.listen(3000, ()=> console.log("Server start"));