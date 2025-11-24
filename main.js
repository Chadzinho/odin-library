const myLibrary = [];
const bookContainer = document.getElementById("bookContainer");
const newBookBtn = document.getElementById("newBookBtn");
const bookDialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");
const cancelBtn = document.getElementById("cancelBtn");

newBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    bookDialog.close();
});

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    const container = document.getElementById("bookContainer");
    container.innerHTML = "";
    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.id = book.id;

        const title = document.createElement("h3");
        title.textContent = book.title;
        card.appendChild(title);

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;
        card.appendChild(author);

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;
        card.appendChild(pages);

        const readStatus = document.createElement("p");
        readStatus.classList.add("read-status");
        readStatus.textContent = book.read
            ? "Status: Read"
            : "Status: Not read yet";
        card.appendChild(readStatus);

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Read";
        toggleBtn.classList.add("toggleReadBtn");
        card.appendChild(toggleBtn);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("removeBtn");
        card.appendChild(removeBtn);

        container.appendChild(card);
    });
}

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    displayBooks();

    bookForm.reset();
    bookDialog.close();
});

function removeBook(id) {
    const index = myLibrary.findIndex((book) => book.id === id);

    if (index !== -1) {
        myLibrary.splice(index, 1);
    }

    displayBooks();
}

function toggleBookRead(id) {
    const book = myLibrary.find((book) => book.id === id);

    if (book) {
        book.toggleRead();
    }

    displayBooks();
}

bookContainer.addEventListener("click", (e) => {
    console.log("Clicked:", e.target);
    //make sure that when I click the remove button on a certain book object in the library, then the object connected to that remove button is removed properly
    if (e.target.classList.contains("removeBtn")) {
        const card = e.target.closest(".book-card");
        const bookId = card.dataset.id;
        removeBook(bookId);
    }

    if (e.target.classList.contains("toggleReadBtn")) {
        const card = e.target.closest(".book-card");
        const bookId = card.dataset.id;
        toggleBookRead(bookId);
    }
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill A Mockingbird", "Harper Lee", 281, true);

displayBooks();

console.log(myLibrary);
