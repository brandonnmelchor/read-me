// Imports
import * as bootstrap from "bootstrap";

// Variables
let readingList = [];

let modal = new bootstrap.Modal(document.getElementById("add-book"));
const form = document.getElementById("new-book");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const commentsInput = document.getElementById("comments");
let read;

// Event Listeners
form.addEventListener("submit", newBook);

// Functions
function Book(title, author, year, comments, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.comments = comments;
  this.read = read;
}

function addBookToList(title, author, year, comments, read) {
  const newBook = new Book(title, author, year, comments, read);
  readingList.push(newBook);
}

function newBook(e) {
  e.preventDefault();

  let title = titleInput.value;
  let author = authorInput.value;
  let year = yearInput.value;
  let comments = commentsInput.value;
  read = document.querySelector('input[name="read-pending"]:checked').value;

  addBookToList(title, author, year, comments, read);

  modal.hide();
  resetForm();
}

function resetForm() {
  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  commentsInput.value = "";
  read = "";
  document.getElementById("read").checked = true;
  document.getElementById("pending").checked = false;
}
