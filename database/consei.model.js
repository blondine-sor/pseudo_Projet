const mongoose = require("mongoose");
const schema = mongoose.Schema;

const conseilSchema = schema({
  conseil: String,
});

const conseils = mongoose.model("conseil", conseilSchema);

module.exports = conseils;
