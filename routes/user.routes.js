const router = require('express').Router()

const { login } = require('../controllers/user.controllers')

router.get('/', login)


module.exports = router