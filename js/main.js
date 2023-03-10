let myLibrary = [];
class Book {
  constructor({ title, author, description, pages, isRead }) {
    this._id = Math.ceil(Math.random() * 10000000);
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.description = description;
    this.isRead = isRead;
  }

  get id() {
    return this._id;
  }
}

const deleteBook = (bookId) => {
  myLibrary = myLibrary.filter((book) => book.id != bookId);
};

const addBook = (bookData) => {
  const newBook = new Book(bookData);
  myLibrary.push(newBook);
};

const getBook = (bookId) => {
  const book = myLibrary.filter((book) => book.id == bookId);
  if (book.length === 0) return null;
  return book[0];
};

const updateBook = (bookId, bookData) => {
  myLibrary = myLibrary.map((book) => {
    if (book.id == bookId) {
      for (key in bookData) {
        if (book.hasOwnProperty(key)) {
          book[key] = bookData[key];
        }
      }
    }
    return book;
  });
};

const setAttributes = (el, attrs) => {
  for (let attName in attrs) {
    el.setAttribute(attName, attrs[attName]);
  }
  return el;
};

const createElement = (elName, elClass = null, options = {}) => {
  const { elText, elAttrs } = options;
  if (!Array.isArray(elClass) && elClass != null) elClass = [elClass];

  const element = document.createElement(elName);
  if (elClass) element.classList.add(...elClass);
  if (elText) element.textContent = elText;
  if (elAttrs) setAttributes(element, elAttrs);
  return element;
};

function deleteBookButtonEvent(e) {
  const bookId = e.target.closest('.card').dataset.key;
  deleteBook(bookId);
  renderBooksUI();
}

function markReadButtonEvent(e) {
  const bookId = e.target.closest('.card').dataset.key;
  const book = getBook(bookId);
  updateBook(bookId, { isRead: !book.isRead });
  renderBooksUI();
}

const createBookCardUI = ({
  id,
  title = 'no title',
  author = 'no author',
  pages = 'no pages',
  description = 'no description',
  isRead = false,
}) => {
  const cardClasses = ['card'];
  if (isRead) cardClasses.push('read');
  const card = createElement('div', cardClasses, {
    elAttrs: { 'data-key': id },
  });

  const card__content = createElement('div', 'card__content');
  const card__header = createElement('header', 'card__header');
  const card__title = createElement('div', 'card__title', { elText: title });
  const card__subtitleAuthor = createElement('div', 'card__subtitle', {
    elText: author,
  });
  const card__subtitlePages = createElement('div', 'card__subtitle', {
    elText: `${pages} pages`,
  });
  const card__subtitleRead = createElement('div', 'card__subtitle', {
    elText: `${isRead ? 'read' : 'not yet read'}`,
  });
  const card__body = createElement('div', 'card__body', {
    elText: description,
  });
  const card__footer = createElement('footer', 'card__footer');
  const buttonDelete = createElement('button', null, { elText: 'delete' });
  const buttonRead = createElement('button', null, {
    elText: `mark as ${isRead ? 'not read' : 'read'}`,
  });

  buttonDelete.addEventListener('click', deleteBookButtonEvent);
  buttonRead.addEventListener('click', markReadButtonEvent);

  card__header.append(card__title);
  card__header.append(card__subtitleAuthor);
  card__header.append(card__subtitlePages);
  card__header.append(card__subtitleRead);
  card__footer.append(buttonRead);
  card__footer.append(buttonDelete);

  card__content.append(card__header);
  card__content.append(card__body);
  card__content.append(card__footer);
  card.append(card__content);
  return card;
};

const renderBooksUI = () => {
  const card__container = document.querySelector('.card__container');
  card__container.innerHTML = '';
  myLibrary.forEach((book) => {
    const card = createBookCardUI(book);
    card__container.append(card);
  });
};

// Form
const addBookButton = globalThis.document.querySelector('#addBookButton');
addBookButton.addEventListener('click', (e) => {
  e.preventDefault();

  const formElement = e.target.closest('form');
  const bookData = {
    title: formElement.elements.namedItem('title').value,
    author: formElement.elements.namedItem('author').value,
    pages: formElement.elements.namedItem('pages').value,
    description: formElement.elements.namedItem('description').value,
    isRead: formElement.elements.namedItem('isRead').checked,
  };

  addBook(bookData);
  renderBooksUI();

  formElement.reset();
});

// seed data
const dataBook = [
  {
    author: 'Carl Sagan',
    pages: 300,
    description:
      'Carl sagan mangrupikeun salahsawios anu aya di bidang kosmik. Bukuna anu judul Cosmos ieu ngabahas rupi-rupi perihal luar angkasa',
    isRead: true,
  },
  {
    title: 'Germ, Gun, and Steel',
    author: 'Jared Diamond',
    pages: 120,
    description: 'Lorem Ipsum',
    isRead: false,
  },
  {
    title: 'Cakcak Buricak',
    author: 'Kabayan kababayan',
    pages: 120,
    description:
      'Cakcak buricak mangrupikeun salahsahiji buku bodor anu teu acan pernah diterbitkeun. Bukuna nyaritakeun tentang anak nu dinamian cakcak buricak. Filosofina supados tiasa nempel di luhur, top person, sareng tiasa nyaangan salarea.',
    isRead: false,
  },
];

dataBook.forEach((book) => {
  addBook(book);
});
dataBook.forEach((book) => {
  addBook(book);
});
dataBook.forEach((book) => {
  addBook(book);
});

globalThis.onload = () => {
  renderBooksUI();
  document.querySelector('.yearDisplay').textContent = new Date().getFullYear();
};
