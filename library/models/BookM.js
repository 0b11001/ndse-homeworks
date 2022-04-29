const { Schema, model } = require('mongoose');

const bookScheme = nwe Schema({
  id: String,
  title: String,
  description: String,
  authors: String,
  favorite: String,
  fileCover: String,
  fileName: String
});

module.exports = model('Book', bookScheme);