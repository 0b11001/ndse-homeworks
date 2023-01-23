const fs = require("fs");
const axios = require("axios");

const COUNTER_URL = process.env.COUNTER_URL || "http://localhost:3001";

let count = 0;

class Book {
  constructor({
    _id,
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  } = {}) {
    this.id = _id || String(++count);
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

  async getData() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      authors: this.authors,
      favorite: this.favorite,
      fileCover: this.fileCover,
      fileName: this.fileName,
      fileBook: this.fileBook,
      viewsCount: await this.viewsCount,
    };
  }

  get viewsCount() {
    return 0;
    // return axios
    //   .get(`${COUNTER_URL}/counter/${this.id}`)
    //   .then((result) => result.data);
  }

  async incrViewsCount() {
    return 0;
    // return axios
    //   .post(`${COUNTER_URL}/counter/${this.id}/incr`)
    //   .then((res) => res.data);
  }
}

module.exports = Book;
