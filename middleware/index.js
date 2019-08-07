const usersDb = require('../users/userDb')

//custom middleware
const logger = (req, res, next) => {
    const timestamp = Date.now();
    const { method, url } = req;
    console.log(`Request method: ${method}`, `Request URL: ${url}`, `Timestamp: ${timestamp}`)
    next()
};

const validateUserId = async (req, res, next) => {
    const { id } = req.params
    const user = await usersDb.getById(id)

    try {
        if (user) {
            req['user'] = user
            next()
        } else {
            res.status(404).json({ success: false, errorMessage: 'Invalid user id' })
            next()
        }
    } catch (error) {
        res.status(500).json({
            error: `missing user data: ${error}`
        })
    }

}

const validateUser = (req, res, next) => {
    const { body } = req;

    if (Object.keys(body).length === 0) {
        res.status(400).json({
            message: `Missing user data`
        })
    }
    const { name } = body
    if (!name) {
        res.status(400).json({
            message: `Missing required field: name`
        })
    }
    next()
};


const validatePost = (req, res, next) => {
    const { body } = req
    if (Object.keys(body).length === 0) {
        res.status(400).json({
            message: `Missing post data`
        })
    }
    const { text } = body
    if (!text) {
        res.status(400).json({
            message: `Missing required field: text`
        })
    }
    next()
};

module.exports = { logger, validateUserId, validateUser, validatePost }