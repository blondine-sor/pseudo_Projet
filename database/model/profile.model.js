const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const profileSchema = schema({
  nom: {
    type: String,
    minlength: [3, "Le nom doit contenir au moins 3 caratères"],
    maxlength: [20, "Le  nom ne peut pas avoir plus de 20 caractères"],
    required: [true, "Ce champ est obligatoire"],
  },
  prenom: {
    type: String,
    minlength: [3, "Le nom doit contenir au moins 3 caratères"],
    maxlength: [20, "Le  prenom ne peut pas contenir plus de 20 caractères"],
    required: [true, "Ce champ est obligatoire"],
  },
  email: {
    type: String,
    minlength: [3, "L'email doit contenir au moins 3 caratères"],
    required: [true, "Ce champ est obligatoire"],
    unique: [true, "Email existe dèja"],
  },
  password: {
    type: String,
    minlength: [5, "Le mot de passe doit contenir au moins 5 caractères"],
    required: [true, "Ce champ est obligatoire"],
  },
});

profileSchema.statics.hashPassword = async function (password) {
  try {
    return await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  } catch (e) {
    throw e;
  }
};

profileSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Profile = mongoose.model("profiles", profileSchema);

module.exports = Profile;
