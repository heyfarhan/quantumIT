const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database Connted Successfully.. : ${connect.connection.host}`)
        // Promise.resolve()
    }
    catch (err) {
        console.log(`Error Connecting in Database  ${err}`)
    }
}

module.exports = connectDb