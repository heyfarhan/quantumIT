const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
var path = require('path');
require('dotenv').config()

const userRoutes = require('./routes/user.routes')
const connectDb = require('./utils/connectDb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('/api', (req, res) => {
    res.send("Hello QuantumIT..")
})

app.use('/api/user', userRoutes)

app.listen(port, () => {
    connectDb()
    console.log(`App listening on Port ${port}...`)
})