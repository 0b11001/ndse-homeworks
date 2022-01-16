const express = require("express");
const Book = require("./Book");

const app = express();

const books = [new Book(), new Book(), new Book()];

app.use(express.json());

app.get("/api/user/login", (req, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.get("/api/book/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((item) => item.id === id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json("not found");
  }
});

app.post("/api/books", (req, res) => {
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

app.put("/api/books/:id", (req, res) => {
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

app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((item) => item.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.json("ok");
  } else {
    res.status(404).json("not found");
  }
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
