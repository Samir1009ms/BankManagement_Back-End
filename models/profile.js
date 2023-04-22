const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    user:{ type:mongoose.Schema.Types.ObjectId, ref:"Auth", required:true},
    profile:[
        {
            fullName:{ type:String, required:true, trim:true},
            street:{ type:String, required:true, trim:true},
            city:{ type:String, required:true, trim:true},
            state:{ type:String, required:true, trim:true},
            country:{ type:String, required:true, trim:true},
        }
    ]

})

const Profile = mongoose.model("Profile",profileSchema)

module.exports = Profile