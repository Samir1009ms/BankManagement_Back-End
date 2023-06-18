const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
    userName: { type: String, trim: true },
    province: { type: String, trim: true },
    city: { type: String, trim: true },
    adress: { type: String, trim: true },
    country: { type: String, trim: true },
    email: { type: String, trim: true },
    date: { type: Date, trim: true },
    phone: { type: String, trim: true },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
