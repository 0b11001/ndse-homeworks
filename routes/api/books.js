const express = require("express");
const storage = require("../../middleware/storage");
const router = express.Router();

const books = require("../../db/books");

router.get("/", (req, res) => {
  res.json(books.all());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.get(id);

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
  const book = books.create({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  });
  res.json(book);
});

router.put("/:id", storage.single("fileBook"), (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const fileBook = req.file ? req.file.path : undefined;
  const book = books.update(id, {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  });
  if (book) {
    res.json(book);
  } else {
    res.status(404).json("not found");
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (books.delete(id)) {
    res.json("ok");
  } else {
    res.status(404).json("not found");
  }
});

router.get("/:id/download", (req, res) => {
  const { id } = req.params;
  const book = books.get(id);
  if (book) {
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
