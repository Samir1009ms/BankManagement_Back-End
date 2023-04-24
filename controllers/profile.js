const Profile = require("../models/profile.js");
const mongoose = require("mongoose");
const getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.send(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { fullName, street, city, state, country } = req.body;
    const profile = await Profile.findOne({ user: userId });
    if (profile) {
      return res.status(404).json({ message: "Profile already exist" });
    }
    const newProfile = new Profile({
      user: userId,
      fullName,
      street,
      city,
      state,
      country,
    });
    await newProfile.save();
    res.send(newProfile);
    res.stasus(200).json({ message: "Profile added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, street, city, state, country } = req.body;

    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
        { user: userId },
        { fullName, street, city, state, country },
        { new: true }
    );

    console.log(updatedProfile);
    res.status(200).json({ message: "Profile updated", updatedProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getProfile, addProfile, updateProfile };
