const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
    
},{timestamps:true})

mongoose.model("User",userSchema)