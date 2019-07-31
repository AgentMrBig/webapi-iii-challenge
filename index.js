// code away!
///////////////////////////////////// custom middleware
const logger = (reqMethod, reqUrl, timestamp) => {
    timestamp = Date.now();
    console.log(`Request method: ${reqMethod}`, `Request URL: ${reqUrl}`, `Timestamp: ${timestamp}`)
};

module.exports = logger;