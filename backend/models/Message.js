const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room"
    }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;