import React from "react";

import "./Search.scss";

const Search = ({ searchEmployee, searchText }) => {
  return (
    <div className="Search">
      <div>
        <h3>Employee Search</h3>
        <input onChange={searchEmployee} value={searchText} />
      </div>
    </div>
  );
};

export default Search;
