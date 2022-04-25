import * as bootstrap from "bootstrap";

let readingList = [];

function Book(title, author, year, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.read = read;
  this.showInfo = function () {
    return `${title} by ${author}. Written ${year}. ${read ? "Read" : "Pending"}.`;
  };
}

function addBookToList(title, author, year, read) {
  const newBook = new Book(title, author, year, read);
  readingList.push(newBook);
}

let title = "The Hobbit";
let author = "J.R.R. Tolkien";
let year = 295;
let read = true;
