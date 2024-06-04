// The modal that will contain the form to add a new book
const modal = document.querySelector('.modal-form');

// When the button is clicked to add a new book, the modal will open
const openModal = document.querySelector('#add-book-btn');
// Closes the modal
const closeModal = document.querySelector('#close-modal-btn');

// Used to store the book cards information
const booksGrid = document.querySelector('.books-grid');

// This is the array that will hold each book created by the user
const myLibrary = [];

openModal.addEventListener('click', () => 
{
    modal.showModal();
})

closeModal.addEventListener('click', () => 
{
    modal.close();
})


// constructor for creating book objects
function Book(title, author, numPages, hasRead)
{
    this.title = title,
    this.author = author,
    this.numPages = numPages,
    this.hasRead = hasRead,

    this.info = function()
    {
        return this.title + ' by ' + this.author + ', ' + this.numPages + ' pages, ' + this.hasRead;
    };
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const testBook = new Book('Test', 'J.R.R. Tester', 317, true);
myLibrary.push(theHobbit);
myLibrary.push(testBook);

// Using this currently to call the function to place the books on the page upon loading
document.addEventListener("DOMContentLoaded", displayBooks());

/* 
    Something I discovered, 3 primary ways to loop arrays!
    look at this stackoverflow question and first answer: 
    https://stackoverflow.com/questions/3010840/loop-through-an-array-in-javascript
    - We will go ahead and use the ES6 for-of statement to loop:
*/
function displayBooks()
{
    // Loop through each book in our 'myLibrary' array:
    for (const book of myLibrary)
    {
        const bookObj = document.createElement('div');
        bookObj.classList.add('book-card');
        booksGrid.appendChild(bookObj);
    }
}

function addBookToLibrary(bookObj)
{
    myLibrary.push(bookObj);
}