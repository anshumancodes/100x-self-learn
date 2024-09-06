// You have to create a middleware for rate limiting a users request based on their username passed in the header

const express = require("express");
const app = express();

let ipArray = [];


const rateLimit = (req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const username = req.headers['username'];

  if (!username) {
    return res.status(400).send("Username is required in the headers");
  }

  const currentTime = Date.now();
  
  // Remove old requests from ipArray (older than 1 minute)
  ipArray = ipArray.filter(item => currentTime - item.time < 60000);

  // Log current request
  ipArray.push({ clientIp, username, time: currentTime });

  // Count the number of requests from this user in the last minute
  const reqNum = ipArray.filter(item => item.username === username).length;

  // If more than 10 requests from the same user, block the request
  if (reqNum > 10) {
    return res.status(429).send("Too many requests");
  }

  // Allow the request if rate limit is not exceeded
  next();
};

app.use(rateLimit);

app.get("/", (req, res) => {
  return res.send("Hello from app");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
