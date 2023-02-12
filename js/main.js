let myLibrary = [
];

function Book({title, author, description, pages, isRead}) {
  this.id = Math.ceil(Math.random()*10000000);
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.description = description
  this.isRead = isRead;
}

const deleteBook = (bookId) => {
  myLibrary = myLibrary.filter(book => book.id != bookId);
}

const addBook = (bookData) => {
  const newBook = new Book(bookData)
  myLibrary.push(newBook)
}

const getBook = (bookId) => {
  const book = myLibrary.filter(book => book.id == bookId);
  if (book.length === 0) return null;
  return book[0];

}

const updateBook = (bookId, bookData) => {
  myLibrary = myLibrary.map(book => {
    if (book.id == bookId) {
      for (key in bookData) {
        if (book.hasOwnProperty(key)) {
          book[key] = bookData[key];
        }
      }
    }
    return book;
  })
}

const setAttributes = (el, attrs) => {
  for (let attName in attrs) {
    el.setAttribute(attName, attrs[attName])
  }
  return el;
}

const createElement = (elName, elClass = null, options = {}) => {
  const {elText, elAttrs} = options;
  if (!Array.isArray(elClass) && elClass != null) elClass = [ elClass ];

  const element = document.createElement(elName)
  if (elClass) element.classList.add(...elClass);
  if (elText) element.textContent = elText;
  if (elAttrs) setAttributes(element, elAttrs)
  return element;
}

function deleteBookButtonEvent(e) {
  const bookId = e.target.closest('.card').dataset.key;
  deleteBook(bookId);
  renderBooksUI();
}

function markReadButtonEvent(e) {
  const bookId = e.target.closest('.card').dataset.key;
  const book = getBook(bookId);
  updateBook(bookId, {isRead: !book.isRead});
  renderBooksUI();
}

const createBookCardUI = ({ 
  id,
  title = 'no title', 
  author = 'no author', 
  pages = 'no pages', 
  description = 'no description', 
  isRead = false}) => {

  const cardClasses = ['card']
  if (isRead) cardClasses.push('read')
  const card = createElement('div', cardClasses, {elAttrs: {"data-key": id}});

  const card__content = createElement('div', 'card__content');
  const card__header = createElement('header', 'card__header');
  const card__title = createElement('div', 'card__title', {elText: title});
  const card__subtitleAuthor = createElement('div', 'card__subtitle', {elText: author});
  const card__subtitlePages = createElement('div', 'card__subtitle', {elText: `${pages} pages`});
  const card__subtitleRead = createElement('div', 'card__subtitle', {elText: `${isRead ? 'read': 'not yet read'}`});
  const card__body = createElement('div', 'card__body', {elText: description});
  const card__footer = createElement('footer', 'card__footer');
  const buttonDelete = createElement('button', null, {elText: 'delete'})
  const buttonRead = createElement('button', null, {elText: `mark as ${isRead ? 'not read': 'read'}`})

  buttonDelete.addEventListener('click', deleteBookButtonEvent);
  buttonRead.addEventListener('click', markReadButtonEvent)

  card__header.append(card__title);
  card__header.append(card__subtitleAuthor);
  card__header.append(card__subtitlePages);
  card__header.append(card__subtitleRead);
  card__footer.append(buttonRead)
  card__footer.append(buttonDelete)

  card__content.append(card__header);
  card__content.append(card__body);
  card__content.append(card__footer);
  card.append(card__content);
  return card;
}

const renderBooksUI = () => {
  const card__container = document.querySelector('.card__container');
  card__container.innerHTML = '';
  myLibrary.forEach(book => {
    const card = createBookCardUI(book);
    card__container.append(card);
  })
}


// seed data
const dataBook = [{ author : 'Carl Sagan', pages: 120, description: 'Lorem Ipsum', isRead: true},
{title: 'Cosmos', author : 'Carl Sagan', pages: 120, description: 'Lorem Ipsum', isRead: true},
{title: 'Cosmos', author : 'Carl Sagan', pages: 120, description: 'Lorem Ipsum', isRead: true},];

dataBook.forEach(book => {
  addBook(book);
})

globalThis.onload = () => {
  renderBooksUI();
}

