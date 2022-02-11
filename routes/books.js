const express = require("express");
const books = require("../db/books");
const storage = require("../middleware/storage");

const router = express.Router();

const getFilePath = (files, name) =>
  files && files[name] && files[name][0] ? files[name][0].path : undefined;

router.get("/", (req, res) => {
  res.render("books/index", {
    title: "Books List",
    page: "books",
    books: books.all(),
  });
});

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Create Book",
    page: "books",
    book: {},
  });
});

router.post(
  "/create",
  storage.fields([
    {
      name: "fileBook",
    },
    {
      name: "fileCover",
    },
  ]),
  (req, res) => {
    const { title, description, authors, favorite } = req.body;
    const fileBook = getFilePath(req.files, "fileBook");
    const fileCover = getFilePath(req.files, "fileCover");

    const book = books.create({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileBook,
    });

    res.redirect("/books/" + book.id);
  }
);

router.get("/:id", (req, res) => {
  const book = books.get(req.params.id);
  if (book) {
    res.render("books/view", {
      title: "Book",
      page: "books",
      book: book,
    });
  } else {
    res.status(404).redirect("/404");
  }
});

router.get("/update/:id", (req, res) => {
  const book = books.get(req.params.id);
  if (book) {
    res.render("books/update", {
      title: "Update Book",
      page: "books",
      book: book,
    });
  } else {
    res.status(404).redirect("/404");
  }
});

router.post(
  "/update/:id",
  storage.fields([
    {
      name: "fileBook",
    },
    {
      name: "fileCover",
    },
  ]),
  (req, res) => {
    const { id } = req.params;
    const { title, description, authors, favorite } = req.body;
    const fileBook = getFilePath(req.files, "fileBook");
    const fileCover = getFilePath(req.files, "fileCover");

    const book = books.update(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileBook,
    });

    if (book) {
      res.redirect("/books/" + id);
    } else {
      res.status(404).redirect("/404");
    }
  }
);

router.get("/download/:id", (req, res) => {
  const { id } = req.params;
  const book = books.get(id);
  if (book) {
    res.download(book.fileBook, (err) => {
      if (err) {
        res.status(404).redirect("/404");
      }
    });
  } else {
    res.status(404).redirect("/404");
  }
});

router.get("/delete/:id", (req, res) => {
  const book = books.delete(req.params.id);
  if (book) {
    res.redirect("/books");
  } else {
    res.status(404).redirect("/404");
  }
});

module.exports = router;
