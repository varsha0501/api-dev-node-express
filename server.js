// **** Issues in below code ****
// Data is not persistant
// Code Architecture
// Authentication 
// Error handling is not there 

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const hotelRouter =  require("./routes/hotels") ;
const userRouter =  require("./routes/users") ;

const PORT = process.env.PORT  || 8081 ;
console.log({PORT});

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Conncted to MongoDB');
})

const logger = (req, res, next) => {
    console.log(`${req.method}: Request received on ${req.url}`);
    next();
};

app.use(logger);
app.use(express.json());
console.log("hotel route file", require("./routes/hotels"));
app.use("/hotels", hotelRouter);
app.use("/users", userRouter);

// app.get("/about-us",(req,res)=>{    
//     res.send("About Us!")
// })

app.listen(PORT, ()=>{
    console.log(`Server is running on the ${PORT}`);    
})

app.get("/",(req,res)=>{
    console.log(req.headers);
    console.log({url : req.url});
    console.log({method : req.method});
    res.send("Welcome to API Development!")
})

// How to create a server in node

// const http = require("http");

// console.log(http);

// const server = http.createServer((req,res)=>{
//     console.log("server has been started");
//     res.end("Hello world!");    
// })

//server.listen(8080);
