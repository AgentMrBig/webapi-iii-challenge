const express = 'express';
const users = require('../users/userDb');
const userRouter = require('express').Router({ mergeParams: true });
const logger = '../../index.js'

// userRouter.post('/', (req, res) => {
//     res.send('YOOO from userRouter');
// });

userRouter.get('/users', async (req, res) => {
    await users
        .get()
        .then(foundUsers => {
            res.json({ success: true, users: foundUsers });
        })
        .catch(({ error }) => {
            res
                .status(500)
                .json({ success: false, errorMessage: 'There was an error getting users', error })
        });
});

userRouter.get('/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .getById(id)
        .then(user => {
            if (user === 0) {

            }
            res.json(user);
        })
        .catch(err => {

        });
});

userRouter.post('/users', validateUser, async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res
            .status(500)
            .json({ success: false, errorMessage: 'Name is required' })
    } else {
        await users
            .insert({ name })
            .then(response => {
                res
                    .status(201).json({ success: true, response });
            })
            .catch(({ error }) => {
                res.status(500).json({
                    success: false,
                    errorMessage:
                        'There was an error while saving user', error: error
                })
            });
    }

});

userRouter.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users
        .update(id, { name })
        .then(response => {
            if (response === 0) {
                // return errorHelper(404, 'No user by that id');
            } else {
                db.find(id).then(user => {
                    res.json(user);
                });
            }
        })
        .catch(err => {
            // return errorHelper(500, 'Database boof', res);
        });
});



// userRouter.post('/:id/posts', (req, res) => {

// });


userRouter.get('users/:id/posts/', (req, res) => {
    const { userId } = req.params;
    users
        .getUserPosts(userId)
        .then(usersPosts => {
            if (usersPosts == 0) {

            }
            res.json(usersPosts);
        })
        .catch(err => {

        });
});

userRouter.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
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

module.exports = userRouter;
