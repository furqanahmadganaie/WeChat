import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        unique:true,
        minlength:6,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"],

    },
    profilePic:{
        type:String,
        default:"",
    },

    //createAt,updateAt => Member since <createAt
    
}, {timestamps:true});


const User = mongoose.model("User",userSchema);

export default User;