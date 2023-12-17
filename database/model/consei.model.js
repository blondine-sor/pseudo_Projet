const mongoose = require("mongoose");
const schema = mongoose.Schema;

const conseilSchema = schema({
  conseil: {
    type: String,
    minlength: [5, "Le champs doit contenir au moins 5 caractères"],
    maxlength: [255, "Le champs ne peut contenir plus de 255 caractères"],
    required: [true, "Ce champs est obligatoire"],
  },
});

const conseils = mongoose.model("conseil", conseilSchema);

module.exports = conseils;
