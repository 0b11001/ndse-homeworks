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
    this.id = String(count++);
    this.title = title || "Book " + this.id;
    this.description = description || "";
    this.authors = authors || "";
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
    this.title = title !== undefined ? title : this.title;
    this.description =
      description !== undefined ? description : this.description;
    this.authors = authors !== undefined ? authors : this.authors;
    this.favorite = favorite !== undefined ? favorite : this.favorite;
    this.fileCover = fileCover !== undefined ? fileCover : this.fileCover;
    this.fileName = fileName !== undefined ? fileName : this.fileName;
    this.fileBook = fileBook !== undefined ? fileBook : this.fileBook;
  }
}

module.exports = Book;
