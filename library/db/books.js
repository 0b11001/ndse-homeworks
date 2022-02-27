const path = require("path");
const fs = require("fs");
const Book = require("../models/Book");

const DB_FILE = process.env.DB_PATH
  ? path.join(process.env.DB_PATH, "books.json")
  : null;

let books = [new Book(), new Book(), new Book()];

if (DB_FILE) {
  if (!fs.existsSync(DB_FILE)) {
    writeToFile(DB_FILE, books);
  }
  books = JSON.parse(fs.readFileSync(DB_FILE)).map((b) => new Book(b));
}

function writeToFile(file, data) {
  if (file) {
    fs.writeFileSync(file, JSON.stringify(data), { flag: "w" });
  }
}

module.exports = {
  all: () => books,
  get: (id) => books.find((item) => item.id === id),
  create: (data) => {
    const book = new Book(data);
    books.push(book);
    writeToFile(DB_FILE, books);
    return book;
  },
  update: (id, data) => {
    const index = books.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const book = books[index];
    book.update(data);
    books.splice(index, 1, book);
    writeToFile(DB_FILE, books);
    return book;
  },
  delete: (id) => {
    const index = books.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const book = books[index];
    books.splice(index, 1);
    book.destroy();
    writeToFile(DB_FILE, books);
    return book;
  },
};
