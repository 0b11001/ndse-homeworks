const mongoose = require("mongoose");
const Book = require("../models/BookM");

mongoose.connect(
  "mongodb+srv://books_admin:books_admin_password@cluster0.jmpxe.mongodb.net/books"
);

module.exports = {
  all: async () => await Book.find().select("-__v"),
  get: async (id) => await Book.findById(id).select("-__v"),
  create: async (data) => {
    const book = new Book(data);
    try {
      await book.save();
    } catch (e) {
      console.error(e);
    }
    return book;
  },
  update: async (id, data) => {
    return await Book.findByIdAndUpdate(id, data);
  },
  delete: (id) => {
    // book.destroy();
    return await Book.deleteOne({ _id: id });
  },
};
