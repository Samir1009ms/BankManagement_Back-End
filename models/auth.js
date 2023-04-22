const mongoose = require('mongoose');


const AuthSchema = new mongoose.Schema({

    name:{ type:String, required:true, trim:true},
    email:{ type:String, required:true, unique:true},
    password:{ type:String, required:true, trim:true},
    isAdmin:{ type:Boolean, default: false,  trim:true},
    cart:[],
    profile:[]


},{timestamps:true
})

const Auth = mongoose.model("Auth",AuthSchema)

module.exports = Auth