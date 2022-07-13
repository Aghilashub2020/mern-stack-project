// Requiring dependencies
const express = require("express");
const messagesController = express.Router();
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

// Requiring model
const Message = require("../models/Message");

// Routes

// Index
messagesController.get("/", async (req, res) => {
    const foundMessages = await Message.find();
    res.send(foundMessages);
});

// Creates new message
messagesController.post("/", jsonParser, (req, res) => {
    console.log("Posted new message", req.body);
    let newMessage = new Message(req.body);
    newMessage.save((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.send(req.body);
});

// Sends message to room
messagesController.post("/:room", jsonParser, (req, res) => {
    console.log(req.body)
    const newMessage = new Message({
        name: req.body.name,
        timeStamp: new Date(),
        text: req.body.text,
        room: req.params.room
    })
    newMessage.save(err => {
        if (err) {
            console.log(err)
        }
    })
    res.send(newMessage)
})

// Room parameter, finds messages in a room
messagesController.get("/:room", jsonParser, async (req, res) => {
    const foundMessages = await Message.find({room: req.params.room})
    console.log(foundMessages)
    res.send(foundMessages)
})

module.exports = messagesController;