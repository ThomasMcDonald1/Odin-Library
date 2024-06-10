/********** Variables **********/

// The modal that will contain the form to add a new book
const modal = document.querySelector('.modal-popup');

// When the button is clicked to add a new book, the modal will open
const openModal = document.querySelector('.add-book-btn');

// Button reference to close the modal
const closeModal = document.querySelector('.close-modal-btn');

// The form we will have the user input book information to
const form = document.querySelector('#modal-form');

// Used to store the book cards information
const booksGrid = document.querySelector('.books-grid');

const toggleBtn = document.querySelector('.read-toggle');

// This is the array that will hold each book created by the user
const myLibrary = [];

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
    const radioChoice = document.querySelector('input[name="read_choice"]:checked');
    // creates the new book object from the form data
    const newBook = new Book(document.getElementById('book_title').value, document.getElementById('author').value, document.getElementById('page_num').value, radioChoice.value);
    // add the new book object to the library array
    myLibrary.push(newBook);
    // reset all fields of the form for a fresh book the next time the user clicks to add another
    form.reset();
    // close the modal after confirming
    modal.close();
    // display the new book information to the screen
    newBook.displaySelf();
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

    this.displaySelf = function()
    {
        displayNewBook(this);
    };

}

function displayNewBook(bookObj)
{
    // the main container for the entire book object that will display on the card
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    // Container for all the text (p) elements on the card
    const textContainer = document.createElement('div');
    textContainer.classList.add('card-text-container');

    // Header
    const bookHeader = document.createElement('p');
    bookHeader.textContent = bookObj.title;
    bookHeader.classList.add('book-header');

    // Author
    const authorBy = document.createElement('p');
    authorBy.textContent = "Written by: " + bookObj.author;
    authorBy.classList.add('book-author');

    // Number of pages
    const numPages = document.createElement('p');
    numPages.textContent = "Total pages: " + bookObj.numPages;
    numPages.classList.add('book-text');

    // Display if the book has been read or not
    const bookRead = document.createElement('p');
    // if (bookObj.hasRead === 'Yes') { bookRead.textContent = "Finished Reading"; }
    // else { bookRead.textContent = "Haven't Read"; }
    // bookRead.classList.add('book-text');

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
    readToggle.style.color = '#e8e8e8';
    readToggle.classList.add('read-toggle');
    if (bookObj.hasRead === 'Yes')
    {
        readToggle.textContent = 'Read';
        readToggle.style.background = '#149119';
    }
    else
    {
        readToggle.textContent = 'Not Read';
        readToggle.style.background = '#A9280C';
    }

    setToggleRead(readToggle);

    // Button used to remove the book from the page (removes from array too)
    const removeBook = document.createElement('button');
    removeBook.textContent = 'Remove Book';
    removeBook.classList.add('book-remove');
    setRemoveListener(removeBook, bookCard, bookObj);
    

    // Attach the 2 buttons to the button container
    buttonContainer.appendChild(readToggle);
    buttonContainer.appendChild(removeBook);

    // Attach the 2 containers to the main book container
    bookCard.appendChild(textContainer);
    bookCard.appendChild(buttonContainer);
    booksGrid.appendChild(bookCard);
}

function setToggleRead(toggle)
{
    toggle.addEventListener('click', () =>
    {
        if (toggle.textContent === 'Read')
        {
            toggle.textContent = 'Not Read';
            toggle.style.background = '#A9280C';
        }
        else
        {
            toggle.textContent = 'Read';
            toggle.style.background = '#149119';
        }
    });
}

// removeBookBtn is the remove button, bookObj is the object associated with it
function setRemoveListener(removeBookBtn, bookCard, bookObj)
{
    removeBookBtn.addEventListener('click', () =>
    {
        booksGrid.removeChild(bookCard);
        bookCard = null;
        removeArrayItem(myLibrary, bookObj);
    });
}

const removeArrayItem = (array, item) =>
{
    // Get the exact index of the item you wish to delete
    const index = array.findIndex((element) => element === item);
    // If the item exists, we splice it
    if (index !== -1)  
    { 
        array.splice(index, 1); 
    }
}