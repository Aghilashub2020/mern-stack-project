// Requiring dependencies
const express = require("express");
const roomsController = express.Router();
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

// Requiring model
const Room = require("../models/Room");

// Routes
roomsController.get("/", async (req, res) => {
    const foundRooms = await Room.find();
    res.send(foundRooms);
});

roomsController.post("/", jsonParser, (req, res) => {
    console.log("Posted new room", req.body);
    let newRoom = new Room(req.body);
    newRoom.save((err) => {
        if (err) {
            console.log(err)
        }
    });
    res.send(req.body);
});

module.exports = roomsController;