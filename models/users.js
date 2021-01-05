var mongoose=require("mongoose");
const router = require("../routes/api/user");
var userSchema=mongoose.Schema({
    firstname: String,
    lastname: String,
    fathername: String,
    role: String,
    idcardnumber:Number,
});
var Users=mongoose.model("Users",userSchema);
module.exports=Users;