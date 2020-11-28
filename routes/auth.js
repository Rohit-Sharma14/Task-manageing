const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const requirelogin = require("../middleware/requirelogin")


//-------------------------------------------------------------- sign up

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with that email" })
            }
            bcrypt.hash(password, 10)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password: hashedpassword,
                        name
                    })

                    user.save().then(user => {
                        res.json({ message: "saved successfully" })
                    }).catch(err => {
                        console.log(err)
                    })
                })

        }).catch(err => {
            console.log(err)
        })
})

//---------------------------------------------------------sign in

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "Please add Email or Password" })
    }
    User.findOne({ email: email }).then(savedUser => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid Email or Password" })
        }
        bcrypt.compare(password, savedUser.password)
            .then(doMatch => {
                if (doMatch) {

                    // res.json({ message: "Successfully Signed in" })
                    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)

                    const { _id, name, email } = savedUser
                    res.json({ token, user: { _id, name, email }, message: "Successfully Signed in" })
                } else {
                    return res.status(422).json({ error: "Invalid Email or Password" })
                }
            }).catch(err => {
                console.log(err)
            })
    })
})



module.exports = router