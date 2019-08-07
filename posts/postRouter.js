const postRouter = require('express').Router({ mergeParams: true })
const userDb = require('../users/userDb')
const postDb = require('../posts/postDb')
const { validatePost } = require('../middleware/index')

postRouter.get('/', async (req, res) => {
    try {
        const { id } = req.user
        const posts = await userDb.getUserPosts(id)
        res.status(200).json({
            posts
        })
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while attempting to get the user's posts`
        })
    }
})

postRouter.post('/', validatePost, async (req, res) => {
    try {
        const { text } = req.body
        const { id } = req.user
        const post = await postDb.insert({ text, user_id: id })
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while attempting to create new post`
        })
    }
})

module.exports = postRouter