// Requiring dependencies
const express = require("express");
const roomsController = express.Router();
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

// Requiring model
const Room = require("../models/Room");
const Message = require("../models/Message")

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

roomsController.delete("/:room", async (req, res) => {
    if (req.params.room !== null) {
        await Room.deleteOne({_id: req.params.room})
        await Message.deleteMany({room: req.params.room})
        res.send(`Successfully deleted room with _id ${req.params.room}`)
    }
})

module.exports = roomsController;