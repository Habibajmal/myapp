const express= require('express');
let router=express.Router();
var Users=require("../../models/users")
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");


//get all users
router.get("/",async(req,res)=>{
    let user=await Users.find();
    return res.send(user);
});


router.get('/:idcardnumber' ,async (req,res)=>
{
    try{
            let user= await Users.find({idcardnumber:req.body.idcardnumber})
            if(!user)
            {
                return res.status(400).send("User is not present");
            }    
            
            return res.send(user);

        }
    catch(err)
        {
            return res.status(400).send("Invalid ID");
        }

    });


// register user
router.post("/register",async(req,res)=>{
    
    let user = await Users.find({$or:[{email:req.body.email},{idcardnumber:req.body.idcardnumber}]});
    if (user) return res.status(400).send("User with given Email or id cardnumber already exist");

        user.name=req.body.name;
        user.fathername=req.body.fathername;
        user.idcardnumber=req.body.idcardnumber;
        user.phonenumber=req.body.phonenumber;
        user.password=req.body.password;
        user.email=req.body.email;
        await user.generateHashedPassword();
        await user.save();
        let token = jwt.sign(
            { _id: user._id, name: user.name, role: user.role },"someprivatekey");
          let datareturn = {
            name: user.firstname,
            email: user.email,
            token: user.token,
          };
          return res.send(datareturn)
    
    
});
router.post("/login", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User Not Registered");
    let isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(401).send("Invalid Password");
    let token = jwt.sign(
      { _id: user._id, name: user.firstname, role: user.role },"someprivatekey");
    res.send(token);
  });
module.exports=router;