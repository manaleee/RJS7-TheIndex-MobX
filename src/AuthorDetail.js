import React, { Component } from "react";

// Components
import BookTable from "./BookTable";

// Stores
import authorStore from "./stores/authorStore";
import bookStore from "./stores/bookStore";

class AuthorDetail extends Component {
  render() {
    const authorID = this.props.match.params.authorID;
    const author = authorStore.getAuthorById(authorID);
    const authorName = `${author.first_name} ${author.last_name}`;

    const books = author.books.map(bookID => bookStore.getBookById(bookID));

    return (
      <div className="author">
        <div>
          <h3>{authorName}</h3>
          <img
            src={author.imageUrl}
            className="img-thumbnail img-fluid"
            alt={authorName}
          />
        </div>
        <BookTable books={books} />
      </div>
    );
  }
}

export default AuthorDetail;
