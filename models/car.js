var mongoose=require("mongoose");
const router = require("../routes/api/cars");
var carSchema=mongoose.Schema({
    carname: String,
    carcolour:String,
    carmakername:String,
    model: String,
    registrationnumber: String,
    enginenumber: Number,
    chasienumber:String,
    manufactureyear:Date,
    enginecc:Number,
    ownercnic:Number,
});
var Cars=mongoose.model("Cars",carSchema);
module.exports=Cars;

