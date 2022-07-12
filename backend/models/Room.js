const mongoose = require("mongoose");

const { Schema } = mongoose;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message",
    }]
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;