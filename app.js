const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const { MONGOURI } = require('./config/keys')



//-----------------------------------------connection to mongo db 

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.connection.on('connected', () => {
    console.log("connected to mongo")
})
mongoose.connection.on('error', () => {
    console.log("error connecting to mongo DB")
})


//-----------------------------------------route handler



app.use(express.json())
require('./models/user')
require('./models/board')
require('./models/card')
app.use(require('./routes/auth'))
app.use(require('./routes/dashboard'))
app.use(require('./routes/board'))
app.use(require('./routes/card'))


//--------------------------------------------------
if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
    })
}



app.listen(PORT, () => {
    console.log("server is running on", PORT)
})