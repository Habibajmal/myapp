
var mongoose=require("mongoose");
const router = require("../routes/api/user");
const Joi = require('joi');
var bcrypt = require("bcryptjs");
var userSchema=mongoose.Schema({
    name: String,
    fathername: String,
    email:String,
    role: {
      type: String,
      default: "warden",
    },
    idcardnumber:Number,
    phonenumber:Number,
    password:String,
});
userSchema.methods.generateHashedPassword = async function () {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  };
  
var Users=mongoose.model("Users",userSchema);
//Sign up Validation
function validateUsers(data)
{
    const schema=Joi.object({
       name: Joi.string().min(3).max(30).required(),
       fathername: Joi.string().min(3).max(30).required(),
       email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().min(3).max(10).required(),
       idcardnumber: Joi.number().min(13).max(13).required(),
       phonenumber: Joi.number().min(13).max(13).required(),
      
    });
}
//Login validation
function validateUserslogin(data)
{
    const schema=Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().min(3).max(10).required(),
     
    });
}
module.exports=Users;
module.exports.validate=validateUsers;
module.exports.validateUserslogin=validateUserslogin;