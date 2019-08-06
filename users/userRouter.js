const express = 'express';
const userDb = require('../users/userDb');
const userRouter = require('express').Router({ mergeParams: true });
const postRouter = require('../posts/postRouter')
const { validateUserId, validateUser } = require('../middleware/index')


userRouter.use('/:id/posts', validateUserId, postRouter)

userRouter.get('/', async (req, res) => {
    try {
        const users = await userDb.get()
        res.status(200).json({
            users
        })
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while attempting to get users`
        })
    }
})

userRouter.get('/:id', validateUserId, (req, res) => {
    const { user } = req
    res.status(200).json(user)
})

userRouter.post('/', validateUser, async (req, res) => {
    try {
        const { name } = req.body
        const user = await userDb.insert({ name })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while attempting to create a new user`
        })
    }
})

userRouter.delete('/:id', validateUserId, async (req, res) => {
    try {
        const { id } = req.user
        await userDb.remove(id)
        res.status(204).end()
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while attempting to delete user`
        })
    }
})

userRouter.put('/:id', validateUserId, validateUser, async (req, res) => {
    try {
        const { id } = req.user
        const { name } = req.body
        await userDb.update(id, { name })
        res.status(204).end()
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while attempting to update user`
        })
    }
})

module.exports = userRouter;
