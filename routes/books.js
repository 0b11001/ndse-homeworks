const express = require("express");
const Book = require("../Book");

const router = express.Router();

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

router.post("/", (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const book = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  });
  books.push(book);
  res.json(book);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((item) => item.id === id);
  if (index !== -1) {
    const book = books[index];
    const { title, description, authors, favorite, fileCover, fileName } =
      req.body;
    book.update({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
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

module.exports = router;
