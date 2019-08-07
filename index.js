// code away!
const server = require('./server');

const PORT = process.env.PORT ? process.env.PORT : 8800;

server.listen(PORT, () => {
    console.log(`\n*** Server Running on port ${PORT} ***\n`);
})