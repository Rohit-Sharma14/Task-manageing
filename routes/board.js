const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Board = mongoose.model('Board')
const Card = mongoose.model('Card')
const requirelogin = require("../middleware/requirelogin")
const card = require('../models/card')






router.get('/board/:id', async (req, res) => {

    await Board.findOne({ _id: req.params.id })
        .populate("createdBy members", "_id name pic")
        .exec((err, board) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            res.json({ board })
        })
    //   .catch(err=>{
    //       return res.status(404).json({error:"Board not found"})
    //   })
})

router.delete('/deleteboard/:id', requirelogin, (req, res) => {
    console.log(id)
    Board.findOne({ _id: req.params.id })
        .populate("createdBy", "_id")
        .exec((err, board) => {
            if (err || !board) {
                return res.sendStatus(422).json({ error: err })
            }
            else {
                Board.remove()
                    .then(result => {
                        res.json({ message: "Successfully deleted" })
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })

})

router.post('/search-user', (req, res) => {
    let userpattern = new RegExp("^" + req.body.query)
    User.find({ email: { $regex: userpattern } })
        .select("_id email")
        .then(user => {
            res.json({ user })
        }).catch(err => {
            console.log(err)
        })
})


//add memebers

router.put('/add/:id/:boardid', (req, res) => {
    console.log(req.params.boardid)
    console.log(req.params.id)
    User.findByIdAndUpdate(req.params.id, {
        $push: { boards: req.params.boardid }
    }, { new: true }).catch(err => {
        return res.status(422).json({ error: err })
    })
    Board.findByIdAndUpdate(req.params.boardid, {
        $push: { members: req.params.id }
    }, { new: true }).populate('members', 'pic  ')
        .then(result => {
            res.json(result)
        }).catch(err => {
            return res.status(422).json({ error: err })
        })


})



router.post('/createcard/:id', async (req, res) => {
    const { title, status, description } = req.body
    if (!title || !status || !description) {
        console.log(title, status, description)
        return res.status(422).json({ error: "please fill all the fields" })
    }
    const newCard = new card({
        title,
        status,
        description,
        board: req.params.id
    })
    newCard.save().then(newCard => {
        res.json({ message: "saved sucessfully" })
    }).catch(err => {
        console.log(err)
    })

    const board = await Board.findById(req.params.id)
    console.log(newCard._id)
    board.cards.unshift(newCard._id)
    await board.save()



})

router.get('/todocard/:id', (req, res) => {
    Card.find({ $and: [{ board: req.params.id }, { status: "todo" }] })

        .then(result => {
            res.json(result)
        })
})
router.get('/indevcard/:id', (req, res) => {
    Card.find({ $and: [{ board: req.params.id }, { status: "indevelopment" }] })

        .then(result => {
            res.json(result)
        })
})

router.get('/torev/:id', (req, res) => {
    Card.find({ $and: [{ board: req.params.id }, { status: "inreview" }] })

        .then(result => {
            res.json(result)
        })
})
router.get('/finished/:id', (req, res) => {
    Card.find({ $and: [{ board: req.params.id }, { status: "finished" }] })

        .then(result => {
            res.json(result)
        })
})


router.put('/comment/:id', requirelogin, (req, res) => {
    // const comment = {
    //     text: req.body.text,
    //     postedBy: req.user._id
    // }
    Card.findByIdAndUpdate(req.params.id, {
        $push: {
            comments: req.body.text
        }
    }, { new: true })
        .populate('comments.postedby', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})

router.get('/card/:id', async (req, res) => {

    await Card.findOne({ _id: req.params.id })
        // .populate("createdBy members", "_id name pic")
        .exec((err, card) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            res.json({ card })
        })

})


// router.post('/comment/:id', (req, res) => {
//     const status = req.body.status
//     // const comment = {
//     //     text: req.body.text,
//     //     postedBy: req.user._id
//     // }
//     // Card.findByIdAndUpdate(req.params.id, {
//     //     $push: {
//     //         comments: req.body.text
//     //     }
//     // }, { new: true })
//     //     .populate('comments.postedby', '_id name')
//     //     .exec((err, result) => {
//     //         if (err) {
//     //             return res.status(422).json({ error: err })
//     //         } else {
//     //             res.json(result)
//     //         }
//     //     })
// })





module.exports = router

