const express = require("express");
const router = express.Router();
const bcrypt =  require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");


router.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    console.log({email, password});
    const dbUser = await User.findOne({email});
    console.log({dbUser})
    const isPasswordSame = await bcrypt.compare(password, dbUser.password);
    console.log({isPasswordSame});

    if(!isPasswordSame){
        res.status(401).send({message:"Password is incorrect!"});
        return;
    }

    const token = jwt.sign({email:dbUser.email, role:dbUser.role},process.env.JWT_SECRET);

    //res.send({success:true});
    res.send({token}); // {dbUser} share wrapped Json with header values
});

router.post("/register", async (req,res)=>{
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    const dbUser = await User.create(user);
    res.send(dbUser);
});


module.exports = router; 





