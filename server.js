const express = require('express');
const cors = require('cors');
const server = express();
const postRouter = require('./data/posts/postRouter');
const userRouter = require('./data/users/userRouter');

server.use(express.json());
server.use(cors({}))

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
  console.log(req);
});

server.use(postRouter);
server.use(userRouter);

const port = 4001;

server.listen(port, () => console.log(`Server listening on ${port}`));









