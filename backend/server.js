// Requiring dependecies
const express = require("express");
const mongoose = require("mongoose");

// Setting up server and environment variables
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to our messaging app.")
});

// Controllers
const messagesController = require("./controllers/messages-controller")
app.use("/messages", messagesController)

const roomsController = require("./controllers/rooms-controller")
app.use("/rooms", roomsController)

// Error page
app.get("*", (req, res) => {
    res.send("The endpoint you have attempted to reach is not available.")
});

// Server listening
app.listen(PORT, () => {
    console.log("Server is listening at port", PORT)
});