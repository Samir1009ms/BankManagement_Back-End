const mongoose = require('mongoose');


const AuthSchema = new mongoose.Schema({

    name:{ type:String, required:true, trim:true},
    email:{ type:String, required:true, unique:true},
    password:{ type:String, required:true, trim:true},
    isAdmin:{ type:Boolean, default: false,  trim:true},
    cart:[],
    profile:{ type:mongoose.Schema.Types.ObjectId, ref:"Profile",
        default:()=> new mongoose.Types.ObjectId()
    },
    bankCard:{ type:mongoose.Schema.Types.ObjectId, ref:"BankCard",}


},{timestamps:true
})

const Auth = mongoose.model("Auth",AuthSchema)

module.exports = Auth