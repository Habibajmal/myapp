const express= require('express');
let router=express.Router();
var Admins =require("../../models/admin")
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
var config=require("config");

//get all users
router.get("/",async(req,res)=>{
    let admin=await Admins.find();
    return res.send(admin);
});
//get user by adminid
router.get("/:adminid",async(req,res)=>{
   try
    { 
        let admin=await Admins.find({adminid: req.params.adminid});

        if(!admin) 
        {
            return res.status(400).send("admin is not found in database");
        }
        else
        {
           return res.send(admin)
                
        }

   }
   catch(err)
   {
       return res.status(400).send("INVALID entry");
   }
});
// register admin
router.post('/register',async function(req, res) {
  let admin=await Admins.findOne({adminid:req.body.adminid});
  if (admin){
    return res.status("400").send("User with given email alreday exists")

  }
  
  if(!req.body.name || !req.body.fathername  || !req.body.password){
    return res.status("401").send("Fill all fields")
  }
  
      let admins=new Admins();
      admins.name=req.body.name;
      admins.fathername=req.body.fathername;
       admins.password=req.body.password;
      admins.adminid=req.body.adminid;
      admins.password= await bcrypt.hash(req.body.password,10)
        

  await admins.save()
  let token=jwt.sign({_id:admins._id,name:admins.name,fathername:admins.fathername },
      config.get("jwtPrivateKey"));
  return  res.send(token)
  
});
router.post("/login", async (req, res) => {
    let admin = await Admins.findOne({ adminid: req.body.adminid });
    console.log(req.body.password);
    if (!admin) return res.status(400).send("Warden Not Registered");
    let isValid = await bcrypt.compare(req.body.password, admin.password);
    if (!isValid) return res.status(401).send("Invalid Password");
    let token = jwt.sign(
      { _id: admin._id, name: admin.name, adminid: admin.adminid },config.get("jwtPrivateKey"));
    res.send(token);
  });
  router.put("/forget",async(req,res)=>
  {
    let admin= await Admins.findOne({idcardnumber: req.body.idcardnumber});
    if (!admin){
      return res.status("400").send("User with given Id did not exists")
  
    }
    
     if (!req.body.password)
     {
      return res.status("400").send("Fill the password")
  
    }
      admin.name=req.body.name;
      admin.fathername=req.body.fathername;
      admin.password=req.body.password;
      admin.adminid=req.body.adminid;
      users.password= await bcrypt.hash(req.body.password,10)
      await users.save()
      let token=jwt.sign({_id:admin._id,name:admin.name,fathername:admin.fathername },
          config.get("jwtPrivateKey"));
          return  res.send(token)
        
  
  });

module.exports=router;