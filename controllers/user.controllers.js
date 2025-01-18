const User = require('../model/user.models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw Error("Please Enter Email and Password!")
        }

        const user = await User.findOne({ email })
        if (!user) {
            throw Error("User Not Found! Please Resgister")
        }

        const isCorrect = await bcrypt.compare(password.trim(), user.password)

        if (!isCorrect) {
            throw Error("Email or Password is Incorrect!")
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        })

        res.status(200).json({
            success: true, message: "User Logged in Successfully!", user: {
                _id: user._id,
                name: user.name,
                dob: user.dob,
                email: user.email
            }
        })

    } catch (err) {
        res.status(403).json({
            success: false,
            message: err.message
        })
    }

}

const register = async (req, res) => {
    try {

        const { name, dob, email, password } = req.body;

        if (!name || !dob || !email || !password) {
            throw Error("Please Enter All Fields!")
        }

        const checkUser = await User.findOne({ email })

        if (checkUser) {
            throw Error("User Already Exist")
        }

        const user = await new User({ name, dob: new Date(dob), email, password })
        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        })

        res.status(201).json({
            success: true, message: "User Registered Successfully!", user: {
                _id: user._id,
                name: user.name,
                dob: user.dob,
                email: user.email
            }
        })


    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const verifyUser = async (req, res) => {

    try {
        const _id = req.user._id;
        const user = await User.findOne({ _id }).select('-password')

        if (!user) {
            throw Error("User Not Found!")
        }

        res.status(200).json({
            success: true,
            message: "User Verified!",
            user
        })

    }
    catch (err) {
        res.status(403).json({
            success: false,
            message: err.message,
            user: null
        })
    }

}

module.exports = { login, register, verifyUser }