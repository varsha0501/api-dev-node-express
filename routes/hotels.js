const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Hotel = require("../models/hotels");

// JSON removed as now data will be fetch from database
// const hotels=[
//     {
//         id:1,
//         name:"Hotel 1",
//         city:"Bangalore",
//         price:1000,
//         rating:4.5,
//         image:"https://source.unsplash.com/1600x1000/?hotels",
//         category:"3 star"
//     },{
//         id:2,
//         name:"Hotel 2",
//         city:"Singapore",
//         price:5000,
//         rating:4.9,
//         image:"https://source.unsplash.com/1600x1000/?hotels",
//         category:"5 star"
//     },
//     {
//         id:3,
//         name:"Hotel 3",
//         city:"Ahmedabad",
//         price:3000,
//         rating:4.1,
//         image:"https://source.unsplash.com/1600x1000/?hotels",
//         category:"4 star"
//     }
// ]

// works as a function / middleware
const verifyToken = (req, res, next) => {
    console.log(req.headers);
    const authHeader = req.headers.authorization;
    // if auth header is not there 
    if(!authHeader){
        next(); 
        return;
    }
    const parseJWT = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.user={
        email : parseJWT.email,
        role : parseJWT.role
    };
    console.log(parseJWT);
    next();
}

router.use(verifyToken); // want to accessible to all routers

router.get("/",async(req,res)=>{ //  /hotels --> removed  /hotels | added into server.js router line no 33
    // both will work - ideally we use json that means will receive json
    //res.send(hotels)
    const hotels = await Hotel.find();
    console.log({hotels});
    res.json(hotels)
})
//localhost:8080/hotels

router.get("/:id",async(req,res)=>{  //  /hotels/:id --> removed  /hotels | added into server.js router line no 33
    console.log(req.params)
    //const hotel = hotels.find((h) => h.id === parseInt(req.params.id,10));
    const getHotelById = await Hotel.findById(req.params.id);
    res.send(getHotelById); // hotel
})
//localhost:8080/hotels/1

// create hotel
router.post("/",async(req,res)=>{
    const hotel = req.body;
    const user = req.user;
    if(user.role == "SUPER_ADMIN"){
        const createHotel = await Hotel.create(hotel);
        res.send(createHotel);
    }
    else{
        res.status(403).send({message:"Unauthorized"});
    }
    // hotel.id = hotels.length + 1;
    // hotels.push(hotel);    
}); // have to mention app.use(express.json()) before creating hotel 

// update hotel
// router.put("/:id",(req, res)=>{
//     const newHotelInfo = req.body;
//     // hotels[0] / hotels[1] want to update
//     hotels[parseInt(req.params.id,10)-1] = newHotelInfo ;
//     res.send(newHotelInfo);
// })
// //localhost:8080/hotels/1

// //delete hotel
// router.delete("/:id",(req, res)=>{
//     hotels.splice(parseInt(req.params.id, 10) - 1, 1);
//     res.send({ success: true });
// })

module.exports = router ;