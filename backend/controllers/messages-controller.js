// Requiring dependencies
const express = require("express");
const messagesController = express.Router();
const bodyParser = require("body-parser")

const jsonParser = bodyParser.json()

// Requiring model
const Message = require("../models/Message")

// Routes
messagesController.get("/", (req, res) => {
    res.send("Welcome to the messagesController endpoint.")
});

messagesController.post("/", jsonParser, (req, res) => {
    console.log("Posted new message", req.body)
    let newMessage = new Message(req.body)
    newMessage.save((err) => {
        if (err) {
            console.log(err)
        } else {

        }
    })

    res.send(req.body)
})

module.exports = messagesController;