// Imports
import * as bootstrap from "bootstrap";

// Variables
let readingList = [];
const bookList = document.getElementById("book-list");

let addBookModal = new bootstrap.Modal(document.getElementById("add-book-modal"));
const addBookForm = document.getElementById("add-book-form");
const titleAdd = document.getElementById("title");
const authorAdd = document.getElementById("author");
const yearAdd = document.getElementById("year");
const commentsAdd = document.getElementById("comments");
let readStatus;

let editBookModal = new bootstrap.Modal(document.getElementById("edit-book-modal"));
const editBookForm = document.getElementById("edit-book-form");
const titleEdit = document.getElementById("edit-title");
const authorEdit = document.getElementById("edit-author");
const yearEdit = document.getElementById("edit-year");
const commentsEdit = document.getElementById("edit-comments");
let cardEditIndex;

// Event Listeners
addBookForm.addEventListener("submit", createBook);
editBookForm.addEventListener("submit", editBook);

function createEditEvents() {
  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((button) => {
    button.addEventListener("click", setEditBookForm);
  });
}

function createDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", removeBook);
  });
}

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

  let title = titleAdd.value;
  let author = authorAdd.value;
  let year = yearAdd.value;
  let comments = commentsAdd.value;
  readStatus = document.querySelector('input[name="read-pending"]:checked').value;

  if (checkDuplicates(title)) {
    alert(`"${title}" is already in your libary.`);
    return;
  }

  addBook(title, author, year, comments, readStatus);
  createCards();
  createEditEvents();
  createDeleteEvents();

  addBookModal.hide();
  resetAddBookForm();
}

function addBook(title, author, year, comments, read) {
  const newBook = new Book(title, author, year, comments, read);
  readingList.push(newBook);
}

function createCards() {
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
    const readLabel = document.createElement("label");
    const buttonEdit = document.createElement("button");
    const buttonDelete = document.createElement("button");

    col.classList.add("col");
    card.classList.add("card", "h-100");
    cardHeader.classList.add("card-header");
    cardBody1.classList.add("card-body", "h-100");
    cardTitle.classList.add("card-title", "text-muted", "mb-3");
    cardText.classList.add("card-text");
    cardBody2.classList.add("card-body", "d-flex", "gap-2");
    checkbox.classList.add("btn-check");
    readLabel.classList.add("btn", "btn-outline-secondary", "me-auto");
    buttonEdit.classList.add("btn", "btn-outline-secondary", "edit");
    buttonDelete.classList.add("btn", "btn-outline-secondary", "delete");

    col.setAttribute("id", `${index}`);
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `read-book${index}`);
    checkbox.setAttribute("autocomplete", "off");
    readLabel.setAttribute("for", `read-book${index}`);
    buttonEdit.setAttribute("type", "button");
    buttonEdit.setAttribute("data-bs-toggle", "modal");
    buttonEdit.setAttribute("data-bs-target", "#edit-book-modal");
    buttonDelete.setAttribute("type", "button");

    cardHeader.textContent = book.title;
    cardTitle.textContent = `${book.author} | ${book.year}`;
    cardText.textContent = book.comments;
    if (book.read == "true") checkbox.checked = true;
    readLabel.textContent = "Read";
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
    cardBody2.appendChild(readLabel);
    cardBody2.appendChild(buttonEdit);
    cardBody2.appendChild(buttonDelete);
  });
}

function resetAddBookForm() {
  titleAdd.value = "";
  authorAdd.value = "";
  yearAdd.value = "";
  commentsAdd.value = "";
  readStatus = "";
  document.getElementById("read").checked = true;
  document.getElementById("pending").checked = false;
}

function setEditBookForm() {
  cardEditIndex = this.parentElement.parentElement.parentElement.id;
  titleEdit.value = readingList[cardEditIndex].title;
  authorEdit.value = readingList[cardEditIndex].author;
  yearEdit.value = readingList[cardEditIndex].year;
  commentsEdit.value = readingList[cardEditIndex].comments;
}

function editBook(e) {
  e.preventDefault();

  if (checkDuplicates(titleEdit.value)) {
    alert(`"${titleEdit.value}" is already in your libary.`);
    return;
  }

  readingList[cardEditIndex].title = titleEdit.value ? titleEdit.value : readingList[cardEditIndex].title;
  readingList[cardEditIndex].author = authorEdit.value ? authorEdit.value : readingList[cardEditIndex].author;
  readingList[cardEditIndex].year = yearEdit.value ? yearEdit.value : readingList[cardEditIndex].year;
  readingList[cardEditIndex].comments = commentsEdit.value ? commentsEdit.value : readingList[cardEditIndex].comments;

  createCards();
  createEditEvents();
  createDeleteEvents();

  editBookModal.hide();
  resetEditBookForm();
}

function resetEditBookForm() {
  titleEdit.value = "";
  authorEdit.value = "";
  yearEdit.value = "";
  commentsEdit.value = "";
  cardEditIndex = null;
}

function removeBook() {
  const cardIndex = this.parentElement.parentElement.parentElement.id;
  readingList.splice(cardIndex, 1);

  createCards();
  createEditEvents();
  createDeleteEvents();
}

function checkDuplicates(title) {
  let duplicateBook = false;

  readingList.forEach((book, index) => {
    if (book.title.toLowerCase() === title.toLowerCase()) {
      duplicateBook = true;
      if (cardEditIndex !== undefined && cardEditIndex == index) duplicateBook = false;
    }
  });

  return duplicateBook;
}

// Placeholder Books
let phTitle1 = "The Count of Monte Cristo";
let phAuthor1 = "Alexandre Dumas";
let phYear1 = 1844;
let phComments1 = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, autem.";
let phRead1 = "true";

let phTitle2 = "Dune";
let phAuthor2 = "Frank Herbert";
let phYear2 = 1965;
let phComments2 = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, autem.";
let phRead2 = "false";

// Setup
addBook(phTitle1, phAuthor1, phYear1, phComments1, phRead1);
addBook(phTitle2, phAuthor2, phYear2, phComments2, phRead2);
createCards();
createEditEvents();
createDeleteEvents();
