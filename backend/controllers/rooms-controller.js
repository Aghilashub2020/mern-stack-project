// Requiring dependencies
const express = require("express");
const roomsController = express.Router();

// Routes
roomsController.get("/", (req, res) => {
    res.send("Welcome to the roomsController endpoint.")
});

module.exports = roomsController;