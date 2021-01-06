const express= require('express');
let router=express.Router();
var Challans=require("../../models/challan");
//all challan
router.get("/",async(req,res)=>{
    let challan=await Challans.find();
    return res.send(challan);
});

//get challan by its cnic
router.get("/:registrationnumber",async(req,res)=>{
    try
     { 
         let challan=await Challans.find({registrationnumber: req.params.registrationnumber});
 
         if(challan) 
         {
            return res.send(challan);           
         }
         else
         {
            return res.status(400).send("Challan is not found against that registration number");
      
         }
 
    }
    catch(err)
    {
        return res.status(400).send("INVALID entry");
    }
 });
//get challan by its registration number
router.get("/:ownercnic",async(req,res)=>{
    try
     { 
         let challan=await Challans.find({ownercnic: req.body.ownercnic});
 
         if(challan) 
         {
            return res.send(challan);           
         }
         else
         {
            return res.status(400).send("Challan is not found against that cnic");
      
         }
 
    }
    catch(err)
    {
        return res.status(400).send("INVALID entry");
    }
 });

//post a challan
router.post("/",async(req,res)=>{
    let challan=new Challans();

    challan.registrationnumber= req.body.registrationnumber;
    challan.ownercnic= req.body.ownercnic;
    challan.city=req.body.city;
    challan.issuedate=req.body.issuedate;
    challan.amount=req.body.amount;
    challan.latitude=req.body.latitude;
    challan.longitude=req.body.longitude;
    challan.wardenid=req.body.wardenid;
    await cars.save();
    return res.send(challan);
});

module.exports=router;