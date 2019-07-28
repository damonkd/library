const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: false },
  published: { type: String, required: false },
  bookId: { type: String, required: false },
  description: { type: String, required: false },
  date: { type: Date, default: Date.now },
  saved: {type: String, required: false}
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
