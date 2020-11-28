const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Board = mongoose.model('Board')
const requirelogin = require("../middleware/requirelogin")





router.post('/createboard', requirelogin, async (req, res) => {
    const { title } = req.body
    if (!title) {
        return res.status(422).json({ error: "Please add a Title" })
    }
    req.user.password = undefined
    const newBoard = new Board({
        boardtitle: title,
        createdBy: req.user
    })
    newBoard.save().then(newBoard => {
        res.json({ message: "saved sucessfully" })
    }).catch(err => {
        console.log(err)
    })
    //--------------------------------------------pushing the created board
    const user = await User.findById(req.user.id)
    user.boards.unshift(newBoard.id)
    await user.save()
    // console.log(req.user)

})

router.get('/myboards', requirelogin, async (req, res) => {

    try {
        const user = await User.findById(req.user._id)
        const boards = [];
        for (const boardId of user.boards) {
            boards.push(await Board.findById(boardId));
        }
        res.json(boards);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }


})

router.put('/uploadpic', requirelogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, { $set: { pic: req.body.pic } }, { new: true },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: "pic not posted" })
            }
            res.json(result)
        })
})





module.exports = router


