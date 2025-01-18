const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const userRoutes = require('./routes/user.routes')
const connectDb = require('./utils/connectDb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello QuantumIT..")
})

app.use('/user', userRoutes)

app.listen(port, () => {
    connectDb()
    console.log(`App listening on Port ${port}...`)
})