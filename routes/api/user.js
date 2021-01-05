const express= require('express');
let router=express.Router();
var Users=require("../../models/users")
router.get("/",async(req,res)=>{
    let user=await Users.find();
    return res.send(user);
});
//get all users
router.get("/",async(req,res)=>{
    let user=await Users.find();
    return res.send(user);
});
//get user by role
router.get("/:role",async(req,res)=>{
   try
    { 
        let user=await Users.find({role: req.params.role});

        if(!user) 
        {
            return res.status(400).send("Role is not found in database");
        }
        else
        {
           return res.send(user)
                
        }

   }
   catch(err)
   {
       return res.status(400).send("INVALID entry");
   }
});
//get users by Id


router.get('/:role/:id' ,async (req,res)=>
{
    try{
            let user= await Users.find({$and:[{role:req.params.role},{_id:req.params.id}]})
            if(!user)
            {
                return res.status(400).send("Product is not present");
            }    
            
            return res.send(user);

        }
    catch(err)
        {
            return res.status(400).send("Invalid ID");
        }

    });


// enter user
router.post("/",async(req,res)=>{
    let user=new Users();
    user.firstname=req.body.firstname;
    user.lastname=req.body.lastname;
    user.fathername=req.body.fathername;
    user.role=req.body.role;
    user.idcardnumber=req.body.idcardnumber;

    await user.save();
    return res.send(user);
});
module.exports=router;