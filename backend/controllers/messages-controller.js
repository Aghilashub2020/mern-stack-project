// Requiring dependencies
const express = require("express");
const messagesController = express.Router();

// Routes
messagesController.get("/", (req, res) => {
    res.send("Welcome to the messagesController endpoint.")
});

module.exports = messagesController;