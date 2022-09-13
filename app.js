// Express Framework
const express = require('express');
const app = express();
app.use(express.json());

// dotenv package
require("dotenv").config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL).then(()=> console.log('connection established'))

app.listen(3000, ()=> console.log("Server start"));