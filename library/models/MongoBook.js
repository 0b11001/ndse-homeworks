const { Schema, model } = require("mongoose");

const bookScheme = new Schema({
  id: String,
  title: String,
  description: String,
  authors: String,
  favorite: String,
  fileCover: String,
  fileName: String,
  fileBook: String,
});

module.exports = model("Book", bookScheme);
