const router = require('express').Router()
const postsRouter = require('../posts/postRouter')
const usersDb = require('../users/userDb')
const { validateUserId, validateUser } = require('../middleware')

router.use('/:id/posts', validateUserId, postsRouter)

router.get('/', async (req, res) => {
    try {
        const users = await usersDb.get()
        res.status(200).json({
            users
        })
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while attempting to get users`
        })
    }
})

router.get('/:id', validateUserId, (req, res) => {
    try {
        const { user } = req
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: `An error occurred getting user by id: ${error}`
        })
    }
})

router.post('/', validateUser, async (req, res) => {
    try {
        const { name } = req.body
        const user = await usersDb.insert({ name })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while attempting to create a new user`
        })
    }
})

router.delete('/:id', validateUserId, async (req, res) => {
    try {
        const { id } = req.user
        await usersDb.remove(id)
        res.status(204).end()
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while attempting to delete user`
        })
    }
})

router.put('/:id', validateUserId, validateUser, async (req, res) => {
    try {
        const { id } = req.user
        const { name } = req.body
        await usersDb.update(id, { name })
        res.status(204).end()
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while attempting to update user`
        })
    }
})

module.exports = router