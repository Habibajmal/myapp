const express= require('express');
let router=express.Router();
var Wardens =require("../../models/warden")
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");


//get all users
router.get("/",async(req,res)=>{
    let warden=await Wardens.find();
    return res.send(warden);
});
//get user by wardenid
router.get("/:wardenid",async(req,res)=>{
   try
    { 
        let warden=await Wardens.find({wardenid: req.body.wardenid});

        if(!warden) 
        {
            return res.status(400).send("Warden is not found in database");
        }
        else
        {
           return res.send(warden)
                
        }

   }
   catch(err)
   {
       return res.status(400).send("INVALID entry");
   }
});
// register warden
router.post("/register",async(req,res)=>{
    
    let warden = await Wardens.find({wardenid:req.body.wardenid});
    if (warden) return res.status(400).send("Warden exists aalready with given wardenid ");

        warden.name=req.body.name;
        warden.fathername=req.body.fathername;
        warden.role=req.body.role;
        warden.wardenid=req.body.wardenid;
        warden.password=req.body.password;
        await warden.generateHashedPassword();
        await warden.save();
        let token = jwt.sign(
            { _id: warden._id, name: warden.name, wardenid: warden.wardenid },"someprivatekey");
          let datareturn = {
            name: warden.name,
            wardenid: warden.wardenid,
            token: waeden.token,
          };
          return res.send(datareturn)
    
    
});
router.post("/login", async (req, res) => {
    let warden = await Wardens.findOne({ email: req.body.email });
    if (!warden) return res.status(400).send("Warden Not Registered");
    let isValid = await bcrypt.compare(req.body.password, warden.password);
    if (!isValid) return res.status(401).send("Invalid Password");
    let token = jwt.sign(
      { _id: warden._id, name: warden.name, wardenid: warden.wardenid },"someprivatekey");
    res.send(token);
  });
module.exports=router;