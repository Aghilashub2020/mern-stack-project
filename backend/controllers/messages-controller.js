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

// Room parameter
messagesController.get("/:room", jsonParser, async (req, res) => {
    const foundMessages = await Message.find({"Room": "62cdf897d3a8b46206fb291b"})
    res.send(foundMessages)
})

module.exports = messagesController;