const express = 'express';
const postsDb = require('../posts/postDb');
const userDb = require('../users/userDb')
const postRouter = require('express').Router({ mergeParams: true });
const logger = '../../index.js'

postRouter.get('/posts', async (req, res) => {
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
});

postRouter.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts
        .getById(id)
        .then(post => {
            if (post === 0) {
                // return errorHelper(404, 'No post by that Id in the DB', res);
            }
            res.json(post);
        })
        .catch(err => {
            // return errorHelper(500, 'Database boof', res);
        });
});

postRouter.put('/posts/:id', (req, res) => {
    const { postId, text } = req.body;
    posts
        .insert({ postId, text })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            // return errorHelper(500, 'Database boof', res);
        });
});

postRouter.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    posts
        .remove(id)
        .then(userRemoved => {
            if (userRemoved === 0) {
                // return errorHelper(404, 'No user by that id');
            } else {
                res.json({ success: 'User Removed' });
            }
        })
        .catch(err => {
            // return errorHelper(500, 'Database boof', res);
        });
});

// custom middleware

function validatePostId(req, res, next) {

};

const validatePost = (req, res, next) => {
    const { text } = req.body;

    if (!req.body) {
        res
            .status(400)
            .json({ success: false, errorMessage: 'missing post data' })
    } else if (!text) {
        res
            .status(400)
            .json({ success: false, errorMessage: 'missing required name field' })
    } else {
        res
            .status(200)
            .json({ success: true, message: 'Post validated' })
    }
}

module.exports = postRouter;