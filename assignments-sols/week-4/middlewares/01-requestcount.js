// You have to create a middleware for logging the number of requests on a server

const express = require("express");
const app = express();


let requestCount=0;

app.get("/",(req,res)=>{
    requestCount++;
    console.log(`Number of requests: ${requestCount}`);

    return res.status(200).json({
        message:"Hello from app",
        requestCount:requestCount
    })
})

app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
  