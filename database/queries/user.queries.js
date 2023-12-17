const Profile = require("../model/profile.model");

const createProfile = async (profile) => {
  try {
    console.log("LeProfile", profile);
    const hashedPassword = await Profile.hashPassword(profile.password);
    const newProfile = new Profile({
      nom: profile.nom,
      prenom: profile.prenom,
      email: profile.email,
      password: hashedPassword,
    });
    return newProfile.save();
  } catch (e) {
    throw e;
  }
};

const findProfilePerEmail = (email) => {
  return Profile.findOne({ email: email }).exec();
};

const findProfilePerId = (id) => {
  return Profile.findById(id).exec();
};

module.exports = {
  createProfile,
  findProfilePerEmail,
  findProfilePerId,
};
