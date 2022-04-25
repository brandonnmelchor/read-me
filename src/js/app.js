function Book(title, author, pages, read, comments) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.comments = comments;
  this.info = function () {
    return `${title} by ${author}. ${pages} pages. ${read ? "Already read" : "Not read yet"}. Info: ${comments}.`;
  };
}
