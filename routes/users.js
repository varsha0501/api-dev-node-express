const express = require("express");
const router = express.Router();
const bcrypt =  require("bcrypt");
const User = require("../models/users");

router.post("/register", async (req,res)=>{
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    const dbUser = await User.create(user);
    res.send(dbUser);
});

module.exports = router; 





