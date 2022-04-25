import * as bootstrap from "bootstrap";

let readingList = [];

function Book(title, author, pages, read, comments) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.showInfo = function () {
    return `${title} by ${author}. ${pages} pages. ${read ? "Read" : "Pending"}.`;
  };
}

function addBookToList(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  readingList.push(newBook);
}

let title = "The Hobbit";
let author = "J.R.R. Tolkien";
let pages = 295;
let read = true;
