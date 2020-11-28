const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board"
    },
    comments: [{
        type: String,

    }]


})


module.exports = mongoose.model("Card", cardSchema)
