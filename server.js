const express = require('express');
const cors = require('cors');
const posts = require('./data/posts/postDb');
const users = require('./data/users/userDb');

const port = 5000;

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

const logger = (reqMethod, reqUrl, timestamp) => {
  timestamp = Date.now();
  console.log(`Request method: ${reqMethod}`, `Request URL: ${reqUrl}`, `Timestamp: ${timestamp}`)
};

const validateUserId = (req, res, next, id) => {
  //const { user_id } = req.body;
  if (!id) {
    // need to check if id match any user id in database
    res
      .status(404)
      .json({ success: false, errorMessage: 'invalid user id' })
  } else {
    // store user object as req.user
  }
};

const validateUser = (req, res, next) => {
  const { name } = req.body;

  if (!req.body) {
    res
      .status(400)
      .json({ success: false, errorMessage: 'missing user data' })
  } else if (!name) {
    res
      .status(400)
      .json({ success: false, errorMessage: 'missing required name field' })
  } else {
    res
      .status(200)
      .json({ success: true, message: 'User Validated' })
  }
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

server.listen(port, () => console.log(`Server listening on ${port}`));
