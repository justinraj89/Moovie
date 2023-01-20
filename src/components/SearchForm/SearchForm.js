import React, { useState } from "react";

const SearchForm = ({ fetchSearchMovies }) => {
  
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      fetchSearchMovies(search);
      setSearch("");
    }
  };

  //---------------------------------------

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //----------------------------------

  return (
    <>
      {/* <h2>Looking for something to Watch?</h2> */}
      <div className="searchform-container">
        <form className="searchAuth-form">
          <div className="Auth-form-content">
            <div className="form-group mt-3"></div>
            <input
              type="text"
              placeholder="Search Movies"
              onChange={handleChange}
              className="form-control mt-1"
              value={search}
            />
            <div className="d-grid gap-2 mt-3">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-secondary"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
