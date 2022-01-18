const express = require("express");
const userRouter = require("./routes/user");
const booksRouter = require("./routes/books");

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/books", booksRouter);

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
