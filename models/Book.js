const fs = require("fs");

let count = 0;

class Book {
  constructor({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  } = {}) {
    this.id = String(++count);
    this.title = (title && title.trim()) || "Book " + this.id;
    this.description = (description && description.trim()) || "";
    this.authors = (authors && authors.trim()) || "";
    this.favorite = favorite || "";
    this.fileCover = fileCover || "";
    this.fileName = fileName || "";
    this.fileBook = fileBook || "";
  }

  update({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  }) {
    this.title = title !== undefined ? title.trim() : this.title;
    this.description =
      description !== undefined ? description.trim() : this.description;
    this.authors = authors !== undefined ? authors.trim() : this.authors;
    this.favorite = favorite !== undefined ? favorite : this.favorite;
    this.fileCover = fileCover !== undefined ? fileCover : this.fileCover;
    this.fileName = fileName !== undefined ? fileName : this.fileName;
    this.fileBook = fileBook !== undefined ? fileBook : this.fileBook;
  }

  destroy() {
    const { fileBook, fileCover } = this;
    if (fileCover && fs.existsSync(fileCover)) {
      fs.rmSync(fileCover);
    }
    if (fileBook && fs.existsSync(fileBook)) {
      fs.rmSync(fileBook);
    }
  }
}

module.exports = Book;
