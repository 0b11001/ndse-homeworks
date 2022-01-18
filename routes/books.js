const express = require("express");
const storage = require("../middleware/storage");
const router = express.Router();

const Book = require("../Book");
const books = [new Book(), new Book(), new Book()];

router.get("/", (req, res) => {
  res.json(books);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((item) => item.id === id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json("not found");
  }
});

router.post("/", storage.single("fileBook"), (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const { path: fileBook } = req.file;
  const book = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  });
  books.push(book);
  res.json(book);
});

router.put("/:id", storage.single("fileBook"), (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((item) => item.id === id);
  if (index !== -1) {
    const book = books[index];
    const { title, description, authors, favorite, fileCover, fileName } =
      req.body;
    const fileBook = req.file ? req.file.path : undefined;
    book.update({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    });
    books.splice(index, 1, book);
    res.json(book);
  } else {
    res.status(404).json("not found");
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((item) => item.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.json("ok");
  } else {
    res.status(404).json("not found");
  }
});

router.get("/:id/download", (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((item) => item.id === id);
  if (index !== -1) {
    const book = books[id];
    res.download(book.fileBook, (err) => {
      if (err) {
        res.status(404).json();
      }
    });
  } else {
    res.status(404).json("not found");
  }
});

module.exports = router;
