const mongoose = require('mongoose')


const BoardSchema = new mongoose.Schema({
    
    boardtitle: {
        type: String,
        required: true
    },
    cards : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    members : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]


})

module.exports = mongoose.model('Board', BoardSchema)