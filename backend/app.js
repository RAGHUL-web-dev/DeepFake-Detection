const express = require("express");
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// APP EXPORTS
module.exports = app;