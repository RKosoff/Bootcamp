class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.borrowedBy = null;
  }
}

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.borrowedBooks = [];
  }
}

class Library {
  constructor() {
    this.books = [];
    this.users = [];
  }

  addBook(title, author) {
    const id = this.books.length + 1;
    const book = new Book(id, title, author);
    this.books.push(book);
    this.output(`Book added: ${title}`);
  }

  removeBook(bookId) {
    this.books = this.books.filter((book) => book.id !== bookId);
    this.output(`Book removed with ID: ${bookId}`);
  }

  viewBooks() {
    let output = "Books in the library:\n";
    this.books.forEach((book) => {
      output += `ID: ${book.id}, Title: ${book.title}, Author: ${
        book.author
      }, Borrowed By: ${
        book.borrowedBy ? book.borrowedBy.name : "Available"
      }\n`;
    });
    this.output(output);
  }

  addUser(name) {
    const id = this.users.length + 1;
    const user = new User(id, name);
    this.users.push(user);
    this.output(`User added: ${name}`);
  }

  viewUsers() {
    let output = "Users in the library:\n";
    this.users.forEach((user) => {
      output += `ID: ${user.id}, Name: ${
        user.name
      }, Borrowed Books: ${user.borrowedBooks
        .map((book) => book.title)
        .join(", ")}\n`;
    });
    this.output(output);
  }

  borrowBook(userId, bookId) {
    const user = this.users.find((user) => user.id === userId);
    const book = this.books.find((book) => book.id === bookId);

    if (user && book && !book.borrowedBy) {
      book.borrowedBy = user;
      user.borrowedBooks.push(book);
      this.output(`${user.name} borrowed the book: ${book.title}`);
    } else {
      this.output(
        "Cannot borrow book. Either the user or book does not exist, or the book is already borrowed."
      );
    }
  }

  returnBook(userId, bookId) {
    const user = this.users.find((user) => user.id === userId);
    const book = this.books.find((book) => book.id === bookId);

    if (user && book && book.borrowedBy === user) {
      book.borrowedBy = null;
      user.borrowedBooks = user.borrowedBooks.filter((b) => b.id !== bookId);
      this.output(`${user.name} returned the book: ${book.title}`);
    } else {
      this.output(
        "Cannot return book. Either the user or book does not exist, or the book was not borrowed by this user."
      );
    }
  }

  output(message) {
    document.getElementById("output").innerText = message;
  }
}

const library = new Library();

document.getElementById("addUserForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("userName").value;
  library.addUser(name);
  document.getElementById("addUserForm").reset();
});

document.getElementById("addBookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  library.addBook(title, author);
  document.getElementById("addBookForm").reset();
});

document
  .getElementById("borrowBookForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const userId = parseInt(document.getElementById("borrowUserId").value);
    const bookId = parseInt(document.getElementById("borrowBookId").value);
    library.borrowBook(userId, bookId);
    document.getElementById("borrowBookForm").reset();
  });

document
  .getElementById("returnBookForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const userId = parseInt(document.getElementById("returnUserId").value);
    const bookId = parseInt(document.getElementById("returnBookId").value);
    library.returnBook(userId, bookId);
    document.getElementById("returnBookForm").reset();
  });

document
  .getElementById("removeBookForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const bookId = parseInt(document.getElementById("removeBookId").value);
    library.removeBook(bookId);
    document.getElementById("removeBookForm").reset();
  });

document
  .getElementById("viewBooksButton")
  .addEventListener("click", function () {
    library.viewBooks();
  });

document
  .getElementById("viewUsersButton")
  .addEventListener("click", function () {
    library.viewUsers();
  });
