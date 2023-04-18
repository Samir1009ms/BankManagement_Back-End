const mongoose = require('mongoose');


const AuthSchema = new mongoose.Schema({

    name:{ type:String, required:true, trim:true},
    email:{ type:String, required:true, unique:true},
    password:{ type:String, required:true, trim:true},
    isAdmin:{ type:Boolean, required:true,  trim:true},
    cart:[],

},{timestamps:true



})

const Auth = mongoose.model("Auth",AuthSchema)

module.exports = Auth