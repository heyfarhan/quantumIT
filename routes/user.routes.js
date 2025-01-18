const router = require('express').Router()

const { login, register, verifyUser } = require('../controllers/user.controllers')

router.get('/login', login)
router.post('/register', register)
router.get('/verify', verifyUser)


module.exports = router