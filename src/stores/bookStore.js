import { decorate, observable, computed } from "mobx";

import axios from "axios";

// import observable from "mobox";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  books = [];
  loading = true;
  query = "";

  fetchAllBook = async () => {
    try {
      const res = await instance.get("/api/books/");
      const books = res.data;

      this.books = books;

      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };

  filterBooksByColor = bookColor =>
    this.books.filter(book => book.color === bookColor);

  get filteredBooks() {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  getBookById = id => this.books.find(book => +book.id === +id);
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchAllBook();

export default bookStore;
