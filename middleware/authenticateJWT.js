const authenticateJWT = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            throw Error("Token Not Found!")
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        if (!id) {
            throw Error("No User _id Exits !")
        }

        req.user = {
            _id: id
        }

        next()
    }
    catch (err) {

        if (err.name === 'TokenExpiredError')
            err.message = 'Token Expired'
        res.status(403).json({ success: false, message: err.message, user: null })

    }
}