const express= require('express');
let router=express.Router();
var Users=require("../../models/users")
const _ = require("lodash");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const e = require('express');
var config=require("config");

//get all users
router.get("/",async(req,res)=>{
    let user=await Users.find();
    return res.send(user);
});
router.get("/:idcardnumber",async(req,res)=>{
    let user=await Users.findOne({idcardnumber:req.params.idcardnumber});
    if(user)
    {
    return res.send(user);
    }
    return res.send("User is not present");
});

// register user
router.post('/register',async function(req, res) {
    let oneuser=await Users.findOne({idcardnumber:req.body.idcardnumber})
    if (oneuser){
      return res.status("400").send("User with given email alreday exists")
  
    }
    
    if(!req.body.name || !req.body.fathername || !req.body.email || !req.body.password){
      return res.status("401").send("Fill all fields")
    }
    
    let users= new Users()
    users.name=req.body.name;
    users.fathername=req.body.fathername;
    users.email=req.body.email;
    users.password=req.body.password;
    users.idcardnumber=req.body.idcardnumber;
    users.phonenumber=req.body.phonenumber;
    users.password= await bcrypt.hash(req.body.password,10)
    await users.save()
    let token=jwt.sign({_id:users._id,name:users.name,fathername:users.fathername },
        config.get("jwtPrivateKey"));
    return  res.send(token)
    
  });
  
router.post("/login", async (req, res) => {
    let user = await Users.findOne({idcardnumber: req.body.idcardnumber});
    if (!user) return res.status(400).send("User Not Registered");
    let isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(401).send("Invalid Password");
    let token = jwt.sign(
      { _id: user._id, name: user.firstname, role: user.role },config.get("jwtPrivateKey"));
    res.send(token);
  });
  router.put("/forget",async(req,res)=>
{
  let users= await Users.findOne({idcardnumber: req.body.idcardnumber});
  if (!users){
    return res.status("400").send("User with given Id did not exists")

  }
  
   if (!req.body.password)
   {
    return res.status("400").send("Fill the password")

  }
    users.name=req.body.name;
    users.fathername=req.body.fathername;
    users.email=req.body.email;
    users.password=req.body.password;
    users.idcardnumber=req.body.idcardnumber;
    users.phonenumber=req.body.phonenumber;
    users.password= await bcrypt.hash(req.body.password,10)
    await users.save()
    let token=jwt.sign({_id:users._id,name:users.name,fathername:users.fathername },
        config.get("jwtPrivateKey"));
        return  res.send(token)
      

});
module.exports=router;