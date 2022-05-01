// imports
import * as bootstrap from "bootstrap";

// variables
let readingList = [];
const bookArea = document.getElementById("book-area");

const addBookButton = document.getElementById("add-book-button");
const clearListButton = document.getElementById("clear-list-button");

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

// max number inputs
yearAdd.max = new Date().getFullYear();
yearEdit.max = new Date().getFullYear();

// event listeners
addBookButton.addEventListener("click", resetAddBookForm);
clearListButton.addEventListener("click", clearReadingList);

addBookForm.addEventListener("submit", createBook);
editBookForm.addEventListener("submit", editBook);

function createReadEvents() {
  const readCheckboxes = document.querySelectorAll(".read-checkbox");
  readCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", updateReadStatus);
  });
}

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

// constructor
function Book(title, author, year, comments, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.comments = comments;
  this.read = read;
}

// functions
function createBook(e) {
  e.preventDefault();

  let title = titleAdd.value;
  let author = authorAdd.value;
  let year = yearAdd.value;
  let comments = commentsAdd.value;
  readStatus = document.querySelector('input[name="read-pending"]:checked').value;

  if (checkDuplicates(title)) {
    alert(`"${title}" is already in your reading list.`);
    return;
  }

  addBook(title, author, year, comments, readStatus);
  saveLocalStorage();
  createBookCards();
  createEditEvents();
  createReadEvents();
  createDeleteEvents();

  addBookModal.hide();
}

function addBook(title, author, year, comments, read) {
  const newBook = new Book(title, author, year, comments, read);
  readingList.push(newBook);
}

function createBookCards() {
  bookArea.textContent = "";

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
    card.classList.add("card", "h-100", "shadow-sm");
    cardHeader.classList.add("card-header");
    cardBody1.classList.add("card-body", "h-100");
    cardTitle.classList.add("card-title", "text-muted", "mb-3");
    cardText.classList.add("card-text");
    cardBody2.classList.add("card-body", "d-flex", "gap-2");
    checkbox.classList.add("btn-check", "read-checkbox");
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

    bookArea.appendChild(col);
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

  createAddCard();
}

function createAddCard() {
  const col = document.createElement("div");
  const card = document.createElement("div");
  const cardBody = document.createElement("div");
  const cardTitle = document.createElement("h4");

  col.classList.add("col");
  card.classList.add("card", "h-100", "shadow-sm");
  cardBody.classList.add("card-body", "d-flex", "justify-content-center", "align-items-center");
  cardTitle.classList.add("card-title", "d-flex", "justify-content-center", "align-items-center", "text-muted");

  card.setAttribute("id", "add-book-card");
  card.setAttribute("role", "button");
  card.setAttribute("data-bs-toggle", "modal");
  card.setAttribute("data-bs-target", "#add-book-modal");
  cardTitle.setAttribute("id", "add-card-height");

  cardTitle.textContent = "Add Book";

  bookArea.appendChild(col);
  col.appendChild(card);
  card.appendChild(cardBody);
  cardBody.appendChild(cardTitle);

  const addBookCard = document.getElementById("add-book-card");
  addBookCard.addEventListener("click", resetAddBookForm);
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

function updateReadStatus() {
  cardEditIndex = this.parentElement.parentElement.parentElement.id;
  readingList[cardEditIndex].read = this.checked ? "true" : "false";

  saveLocalStorage();
  resetEditBookForm();
}

function setEditBookForm() {
  cardEditIndex = this.parentElement.parentElement.parentElement.id;
  titleEdit.value = readingList[cardEditIndex].title;
  authorEdit.value = readingList[cardEditIndex].author;
  yearEdit.value = readingList[cardEditIndex].year;
  commentsEdit.value = readingList[cardEditIndex].comments;

  if (readingList[cardEditIndex].read === "true") {
    document.getElementById("edit-read").checked = true;
    document.getElementById("edit-pending").checked = false;
  } else {
    document.getElementById("edit-read").checked = false;
    document.getElementById("edit-pending").checked = true;
  }
}

function editBook(e) {
  e.preventDefault();

  if (checkDuplicates(titleEdit.value)) {
    alert(`"${titleEdit.value}" is already in your reading list.`);
    return;
  }

  readingList[cardEditIndex].title = titleEdit.value ? titleEdit.value : readingList[cardEditIndex].title;
  readingList[cardEditIndex].author = authorEdit.value ? authorEdit.value : readingList[cardEditIndex].author;
  readingList[cardEditIndex].year = yearEdit.value ? yearEdit.value : readingList[cardEditIndex].year;
  readingList[cardEditIndex].comments = commentsEdit.value ? commentsEdit.value : readingList[cardEditIndex].comments;
  readingList[cardEditIndex].read = document.querySelector('input[name="edit-read-pending"]:checked').value;

  saveLocalStorage();
  createBookCards();
  createEditEvents();
  createReadEvents();
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

function removeBook() {
  const cardIndex = this.parentElement.parentElement.parentElement.id;
  readingList.splice(cardIndex, 1);

  saveLocalStorage();
  createBookCards();
  createEditEvents();
  createReadEvents();
  createDeleteEvents();
}

function clearReadingList() {
  readingList = [];
  localStorage.clear();
  createBookCards();
}

function saveLocalStorage() {
  localStorage.clear();
  readingList.forEach((book, index) => {
    localStorage.setItem(`${index}`, JSON.stringify(book));
  });
}

function loadLocalStorage() {
  readingList = [];
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const savedBook = JSON.parse(localStorage.getItem(`${i}`));
      if (savedBook) addBookFromStorage(savedBook);
    }
  }
}

function addBookFromStorage(book) {
  const newBook = new Book(book.title, book.author, book.year, book.comments, book.read);
  readingList.push(newBook);
}

// placeholder books
let phTitle1 = "The Count of Monte Cristo";
let phAuthor1 = "Alexandre Dumas";
let phYear1 = 1844;
let phComments1 = "Marcus recommended this to me. I really enjoyed it and plan to re-read it again.";
let phRead1 = "true";

let phTitle2 = "Dune";
let phAuthor2 = "Frank Herbert";
let phYear2 = 1965;
let phComments2 = "I just saw the movie recently and was curious about the book. Just adding this here for now as a reminder.";
let phRead2 = "false";

// setup
// addBook(phTitle1, phAuthor1, phYear1, phComments1, phRead1);
// addBook(phTitle2, phAuthor2, phYear2, phComments2, phRead2);
loadLocalStorage();
saveLocalStorage();
createBookCards();
createEditEvents();
createReadEvents();
createDeleteEvents();

// Work in progress
