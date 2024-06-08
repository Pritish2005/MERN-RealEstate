import mongoose, { Types } from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:string,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    }
},{timestamp:true})

const User=mongoose.model('User',userSchema);

export default User;