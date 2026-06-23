import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Searchbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const text = value.trim();

    if (text === "") {
      if (location.pathname === "/szukaj") {
        navigate("/szukaj", { replace: true });
      }
      return;
    }

    navigate(`/szukaj?q=${encodeURIComponent(text)}`);
  };

  return (
    <form className="search-wrapper">
      <input
        className="nav-right"
        type="text"
        placeholder="Search for articles..."
        value={query}
        onChange={handleChange}
      />
    </form>
  );
}

export default Searchbar;