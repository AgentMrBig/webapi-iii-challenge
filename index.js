// code away!
const server = require('./server');

const PORT = process.env.PORT ? process.env.PORT : 4500;

server.listen(PORT, () => {
    console.log(`\n*** Server Running on port ${PORT} ***\n`);
})