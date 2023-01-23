const mongoose = require("mongoose");
const MongoBook = require("../models/MongoBook");
const Book = require("../models/Book");

(async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jmpxe.mongodb.net/books`
    );
  } catch (e) {
    console.log(e);
  }
})();

module.exports = {
  all: async () =>
    (await MongoBook.find().select("-__v")).map((mb) => new Book(mb)),
  get: async (id) => new Book(await MongoBook.findById(id).select("-__v")),
  create: async (data) => {
    const mongoBook = new MongoBook(data);
    try {
      await mongoBook.save();
    } catch (e) {
      console.error(e);
    }
    return new Book(mongoBook);
  },
  update: async (id, data) => {
    return new Book(await MongoBook.findByIdAndUpdate(id, data));
  },
  delete: async (id) => {
    const mongoBook = await MongoBook.findByIdAndDelete({ _id: id });
    const book = mongoBook && new Book(mongoBook);
    if (book) {
      book.destroy();
    }
    return book;
  },
};
