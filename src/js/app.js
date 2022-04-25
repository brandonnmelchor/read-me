let readingList = [];

function Book(title, author, pages, read, comments) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.comments = comments;
  this.showInfo = function () {
    return `${title} by ${author}. ${pages} pages. ${read ? "Already read" : "Not read yet"}. Info: ${comments}.`;
  };
}

function addBookToList(title, author, pages, read, comments) {
  const newBook = new Book(title, author, pages, read, comments);
  readingList.push(newBook);
}

let title = "The Hobbit";
let author = "J.R.R. Tolkien";
let pages = 295;
let read = true;
let comments = "Pretty good book";
