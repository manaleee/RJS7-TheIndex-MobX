import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

// Components
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";

// Stores
import bookStore from "./stores/bookStore";

class BookList extends Component {
  state = {
    books: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const res = await instance.get(
        "https://the-index-api.herokuapp.com/api/books/"
      );
      const books = res.data;
      this.setState({
        books,
        loading: false
      });
    } catch (err) {
      console.error(err);
    }
  }

  filterBooksByColor = bookColor =>
    this.state.books.filter(book => book.color === bookColor);

  render() {
    const bookColor = this.props.match.params.bookColor;
    let books = this.state.books;

    if (bookColor) {
      books = bookStore.getBooksByColor(bookColor);
    }

    return bookStore.loading ? (
      <Loading />
    ) : (
      <div>
        <h3>Books</h3>
        <SearchBar store={bookStore} />
        <BookTable books={books} />
      </div>
    );
  }
}

export default observer(BookList);
