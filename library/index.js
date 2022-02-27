const express = require("express");
const indexRouter = require("./routes/index");
const booksRouter = require("./routes/books");
const userApiRouter = require("./routes/api/user");
const booksApiRouter = require("./routes/api/books");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/api/user", userApiRouter);
app.use("/api/books", booksApiRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Library app is listening at http://localhost:3000`);
});
