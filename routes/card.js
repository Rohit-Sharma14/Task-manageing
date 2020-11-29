const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Card = mongoose.model('Card')
const requirelogin = require("../middleware/requirelogin")




router.post('/status/:id', async (req, res) => {
    const status = await req.body.status

    if (!status) {

        return res.status(422).json({ error: "please fill all the fields" })
    }
    Card.findByIdAndUpdate(req.params.id, {
        $set: { status: status }
    }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            res.json({ result })
        })
})


module.exports = router