
var mongoose=require("mongoose");
const router = require("../routes/api/admins");
const Joi = require('joi');
var bcrypt = require("bcryptjs");
var adminSchema=mongoose.Schema({
    name: String,
    fathername: String,
    role: {
      type: String,
      default: "admin",
    },
    adminid:Number,
    password:String,
});
adminSchema.methods.generateHashedPassword = async function () {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  };
  
var Wardens=mongoose.model("Admin",adminSchema);
//Sign up Validation
function validatewarden(data)
{
    const schema=Joi.object({
       name: Joi.string().min(3).max(30).required(),
       fathername: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(3).max(10).required(),
        adminid: Joi.number().min(13).max(13).required(),
     
      
    });
}
//Login validation
function validatewardenlogin(data)
{
    const schema=Joi.object({
      adminid: Joi.number().min(13).max(13).required(),
      password: Joi.string().min(3).max(10).required(),
     
    });
}
module.exports=Wardens;
module.exports.validatewarden=validatewarden;
module.exports.validatewardenlogin=validatewardenlogin;