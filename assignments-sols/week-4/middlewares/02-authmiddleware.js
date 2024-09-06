
//  Implement an authentication middleware that checks for a valid API key in the request headers.

// start from here
const express = require("express");
const app = express();
const VALID_API_KEY = '100xdevs_cohort3_super_secret_valid_api_key'; // key is 100xdevs-api-key

const auth =(req,res,next)=>{

    const apikeyFromHeader = req.get('VALID_API_KEY');
    if(apikeyFromHeader!==VALID_API_KEY){
        res.status(401).send("Invalid authentication credentials");
    }
    next()

}


app.use(auth)

app.get("/",(req,res)=>{


    return res.status(200).json({
        message:"Hello from app",
        
    })
})



app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });