const mongoose = require('mongoose')
const board = require('./board')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'board'
        }
    ],
    pic: {
        type: String,
        default: "https://hajiri.co/uploads/no_image.jpg"
    }

})



mongoose.model("User", userSchema)