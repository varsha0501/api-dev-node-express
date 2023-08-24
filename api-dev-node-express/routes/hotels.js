const express = require("express");
const router = express.Router();


const hotels=[
    {
        id:1,
        name:"Hotel 1",
        city:"Bangalore",
        price:1000,
        rating:4.5,
        image:"https://source.unsplash.com/1600x1000/?hotels",
        category:"3 star"
    },{
        id:2,
        name:"Hotel 2",
        city:"Singapore",
        price:5000,
        rating:4.9,
        image:"https://source.unsplash.com/1600x1000/?hotels",
        category:"5 star"
    },
    {
        id:3,
        name:"Hotel 3",
        city:"Ahmedabad",
        price:3000,
        rating:4.1,
        image:"https://source.unsplash.com/1600x1000/?hotels",
        category:"4 star"
    }
]


router.get("/",(req,res)=>{ //  /hotels --> removed  /hotels | added into server.js router line no 33
    // both will work - ideally we use json that means will receive json
    //res.send(hotels)
    res.json(hotels)
})
//localhost:8080/hotels

router.get("/:id",(req,res)=>{  //  /hotels/:id --> removed  /hotels | added into server.js router line no 33
    console.log(req.params)
    const hotel = hotels.find((h) => h.id === parseInt(req.params.id,10));
    res.send(hotel);
})
//localhost:8080/hotels/1

// create hotel
router.post("/",(req,res)=>{
    const hotel = req.body;
    hotel.id = hotels.length + 1;
    hotels.push(hotel);
    res.send(hotel);
}); // have to mention app.use(express.json()) before creating hotel 

// update hotel
router.put("/:id",(req, res)=>{
    const newHotelInfo = req.body;
    // hotels[0] / hotels[1] want to update
    hotels[parseInt(req.params.id,10)-1] = newHotelInfo ;
    res.send(newHotelInfo);
})
//localhost:8080/hotels/1

//delete hotel
router.delete("/:id",(req, res)=>{
    hotels.splice(parseInt(req.params.id, 10) - 1, 1);
    res.send({ success: true });
})

module.exports = router ;