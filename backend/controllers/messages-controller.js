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
    if (req.params.room !== null) {
        const foundMessages = await Message.find({room: req.params.room}).sort({_id: -1}).limit(12)
        console.log(foundMessages)
        res.send(foundMessages.reverse())
    }
})

module.exports = messagesController;