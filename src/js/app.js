// Imports
import * as bootstrap from "bootstrap";

// Variables
let readingList = [];
const bookList = document.getElementById("book-list");

let modal = new bootstrap.Modal(document.getElementById("add-book"));
const form = document.getElementById("new-book");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const commentsInput = document.getElementById("comments");
let read;

// Event Listeners
form.addEventListener("submit", createBook);

// Constructor
function Book(title, author, year, comments, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.comments = comments;
  this.read = read;
}

// Functions
function createBook(e) {
  e.preventDefault();

  let title = titleInput.value;
  let author = authorInput.value;
  let year = yearInput.value;
  let comments = commentsInput.value;
  read = document.querySelector('input[name="read-pending"]:checked').value;

  addBookToList(title, author, year, comments, read);
  createCard();
  modal.hide();
  resetForm();
}

function addBookToList(title, author, year, comments, read) {
  const newBook = new Book(title, author, year, comments, read);
  readingList.push(newBook);
}

function createCard() {
  bookList.textContent = "";

  readingList.forEach((book, index) => {
    const col = document.createElement("div");
    const card = document.createElement("div");
    const cardHeader = document.createElement("h5");
    const cardBody1 = document.createElement("div");
    const cardTitle = document.createElement("h6");
    const cardText = document.createElement("p");
    const cardBody2 = document.createElement("div");
    const checkbox = document.createElement("input");
    const buttonRead = document.createElement("label");
    const buttonEdit = document.createElement("button");
    const buttonDelete = document.createElement("button");

    col.classList.add("col");
    card.classList.add("card", "h-100");
    cardHeader.classList.add("card-header");
    cardBody1.classList.add("card-body", "h-100");
    cardTitle.classList.add("card-title", "text-muted", "mb-3");
    cardText.classList.add("card-text");
    cardBody2.classList.add("card-body", "d-flex", "gap-2");
    checkbox.classList.add("btn-check", "read-pending");
    buttonRead.classList.add("btn", "btn-outline-secondary", "me-auto");
    buttonEdit.classList.add("btn", "btn-outline-secondary");
    buttonDelete.classList.add("btn", "btn-outline-secondary");

    col.setAttribute("id", `book${index}`);
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `read-book${index}`);
    checkbox.setAttribute("autocomplete", "off");
    buttonRead.setAttribute("for", `read-book${index}`);
    buttonEdit.setAttribute("type", "button");
    buttonDelete.setAttribute("type", "button");

    cardHeader.textContent = book.title;
    cardTitle.textContent = `${book.author} | ${book.year}`;
    cardText.textContent = book.comments;
    buttonRead.textContent = book.read;
    if (book.read == "Read") checkbox.checked = true;
    buttonEdit.textContent = "Edit";
    buttonDelete.textContent = "Delete";

    bookList.appendChild(col);
    col.appendChild(card);
    card.appendChild(cardHeader);
    card.appendChild(cardBody1);
    cardBody1.appendChild(cardTitle);
    cardBody1.appendChild(cardText);
    card.appendChild(cardBody2);
    cardBody2.appendChild(checkbox);
    cardBody2.appendChild(buttonRead);
    cardBody2.appendChild(buttonEdit);
    cardBody2.appendChild(buttonDelete);
  });
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

// Placeholder Books
let phTitle1 = "The Count of Monte Cristo";
let phAuthor1 = "Alexandre Dumas";
let phYear1 = 1844;
let phComments1 = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, autem.";
let phRead1 = "Read";

let phTitle2 = "Dune";
let phAuthor2 = "Frank Herbert";
let phYear2 = 1965;
let phComments2 = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, autem.";
let phRead2 = "Pending";

addBookToList(phTitle1, phAuthor1, phYear1, phComments1, phRead1);
addBookToList(phTitle2, phAuthor2, phYear2, phComments2, phRead2);
createCard();
