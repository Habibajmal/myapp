const express= require('express');
let router=express.Router();
var Cars=require("../../models/car")
router.get("/",async(req,res)=>{
    let car=await Cars.find();
    return res.send(car);
});

router.post("/",async(req,res)=>{
    let cars=new Cars();
    cars.carname=req.body.carname;
    cars.carcolour=req.body.carcolour;
    cars.carmakername=req.body.carmakername;
    cars.model=req.body.model;
    cars.registrationnumber=req.body.registrationnumber;
    cars.enginenumber=req.body.enginenumber;
    cars.chasienumber=req.body.chasienumber;
    cars.manufactureyear=req.body.manufactureyear;
    cars.enginecc=req.body.enginecc;
    cars.ownercnic=req.body.ownercnic,
    await cars.save();
    return res.send(cars);
});

module.exports=router;