import * as bootstrap from "bootstrap";

let readingList = [];

function Book(title, author, year, comments, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.comments = comments;
  this.read = read;
  this.showInfo = function () {
    return `${title} by ${author}. Written ${year}. ${read ? "Read" : "Pending"}.`;
  };
}

function addBookToList(title, author, year, comments, read) {
  const newBook = new Book(title, author, year, comments, read);
  readingList.push(newBook);
}

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const year = document.querySelector("#year");
const comments = document.querySelector("#comments");
const read = "";

const form = document.querySelector("#form-book");
form.addEventListener("submit", submitBook);

function submitBook() {
  const newRead = document.querySelector('input[name="read-pending"]:checked');
  read = newRead.value;
}

console.log(read);
