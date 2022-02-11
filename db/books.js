const Book = require("../models/Book");

const books = [new Book(), new Book(), new Book()];

module.exports = {
  all: () => books,
  get: (id) => books.find((item) => item.id === id),
  create: (data) => {
    const book = new Book(data);
    books.push(book);
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
    return book;
  },
};
