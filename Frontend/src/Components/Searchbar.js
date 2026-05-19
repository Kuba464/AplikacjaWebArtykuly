import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/szukaj?q=${query}`);
  };

  return (
    <form className="search-wrapper" onChange={handleSubmit}>
      <input
        className="nav-right"
        type="text"
        placeholder="Search for articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setQuery("")}
      />
    </form>
  );
}

export default Searchbar;