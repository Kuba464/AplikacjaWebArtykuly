import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [query, setQuery] = useState("");

   const navigate = useNavigate();

  useEffect(() => {
    navigate(`/szukaj?q=${query}`);
  }, [query]);

  return (
    <form className="search-wrapper">
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