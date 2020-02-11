import React from "react";
import { observer } from "mobx-react";

// Components
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";

// Store
import authorStore from "./stores/authorStore";

const AuthorList = () => {
  const authorCards = authorStore.filteredAuthors.map(author => (
    <AuthorCard key={author.id} author={author} />
  ));

  return (
    <div>
      <h3>Authors</h3>
      <SearchBar store={authorStore} />
      <div className="row">{authorCards}</div>
    </div>
  );
};

export default observer(AuthorList);
