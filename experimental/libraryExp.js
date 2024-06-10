/********** Variables **********/

// The modal that will contain the form to add a new book
const modal = document.querySelector('.modal-popup');

// When the button is clicked to add a new book, the modal will open
const openModal = document.querySelector('#add-book-btn');

// Button reference to close the modal
const closeModal = document.querySelector('#close-modal-btn');

// The form we will have the user input book information to
const form = document.querySelector('#modal-form');

// Used to store the book cards information
const booksGrid = document.querySelector('.books-grid');

const toggleBtn = document.querySelector('.read-toggle');

// This is the array that will hold each book created by the user
const myLibrary = [];

// Tracks the number of books 
let numBooks = 0;

/********** Event Listeners **********/

// when the add book button is clicked, the modal will pop up
openModal.addEventListener('click', () => 
{
    modal.showModal();
});

// cancels adding the book, clears the form, and closes the modal
closeModal.addEventListener('click', () => 
{
    form.reset();
    modal.close();
});



form.addEventListener('submit', (thisEvent) =>
    {
        // stops the form from submitting
        thisEvent.preventDefault();
        // grabs the value of which radio button was checked
        const radioChoice = document.querySelector('input[name="read_choice"]:checked').value;
        // creates the new book object from the form data
        const newBook = new Book(document.getElementById('book_title').value, document.getElementById('author').value, document.getElementById('page_num').value, radioChoice);
        // add the new book object to the library array
        myLibrary.push(newBook);
        // reset all fields of the form for a fresh book the next time the user clicks to add another
        form.reset();
        // close the modal after confirming
        modal.close();
        // display the new book information to the screen
        displayNewBook();
    });

form.addEventListener('submit', (thisEvent) =>
{
    // stops the form from submitting
    thisEvent.preventDefault();
    // grabs the value of which radio button was checked
    const radioChoice = document.querySelector('input[name="read_choice"]:checked').value;
    // creates the new book object from the form data
    const newBook = new Book(document.getElementById('book_title').value, document.getElementById('author').value, document.getElementById('page_num').value, radioChoice);
    // add the new book object to the library array
    myLibrary.push(newBook);
    // reset all fields of the form for a fresh book the next time the user clicks to add another
    form.reset();
    // close the modal after confirming
    modal.close();
    // display the new book information to the screen
    displayNewBook();
});

/********** Functions **********/


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

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'No');
const testBook = new Book('Test', 'J.R.R. Tester', 317, 'Yes');
myLibrary.push(theHobbit);
myLibrary.push(testBook);

// Using this currently to call the function to place the books on the page upon loading
document.addEventListener("DOMContentLoaded", displayEmptyMessage());

function displayEmptyMessage()
{
    // This is for initial testing purposes for when dom loads
    let i = 1;
    for (const book of myLibrary)
    {
        // the main container for the entire book object that will display on the card
        const bookObj = document.createElement('div');
        bookObj.classList.add('book-card');

        // Container for all the text (p) elements on the card
        const textContainer = document.createElement('div');
        textContainer.classList.add('card-text-container');

        // Header
        const bookHeader = document.createElement('p');
        bookHeader.textContent = "Book #" + i + ": " + book.title;
        bookHeader.classList.add('book-header');

        // Author
        const authorBy = document.createElement('p');
        authorBy.textContent = "Written by: " + book.author;
        authorBy.classList.add('book-author');

        // Number of pages
        const numPages = document.createElement('p');
        numPages.textContent = "Total pages: " + book.numPages;
        numPages.classList.add('book-text');

        // Display if the book has been read or not
        const bookRead = document.createElement('p');
        if (book.hasRead === 'Yes') { bookRead.textContent = "You have read this book."; }
        else { bookRead.textContent = "You have not read this book yet."; }
        bookRead.classList.add('book-text');

        // Attach all the text parts to the text container
        textContainer.appendChild(bookHeader);
        textContainer.appendChild(authorBy);
        textContainer.appendChild(numPages);
        textContainer.appendChild(bookRead);

        // Container for buttons on card
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('card-btn-container');

        // Button used to toggle read status
        const readToggle = document.createElement('button');
        readToggle.textContent = 'Toggle Read Status';
        readToggle.classList.add('read-toggle');

        // Button used to remove the book from the page (removes from array too)
        const removeBook = document.createElement('button');
        removeBook.textContent = 'Remove Book';
        removeBook.classList.add('book-remove');

        // Attach the 2 buttons to the button container
        buttonContainer.appendChild(readToggle);
        buttonContainer.appendChild(removeBook);

        // Attach the 2 containers to the main book container
        bookObj.appendChild(textContainer);
        bookObj.appendChild(buttonContainer);
        booksGrid.appendChild(bookObj);
        i++;
    }
}

function displayNewBook(newBook)
{
    numBooks++;
    const bookObj = document.createElement('div');
    bookObj.classList.add('book-card');
    booksGrid.appendChild(bookObj);
}