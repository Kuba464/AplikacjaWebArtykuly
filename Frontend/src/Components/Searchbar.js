import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Searchbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const text = query.trim();

    if (text === "") {
      if (location.pathname === "/szukaj") {
        navigate("/szukaj", { replace: true });
      }
      return;
    }

    navigate(`/szukaj?q=${encodeURIComponent(text)}`);
  }, [query, navigate, location.pathname]);

  return (
    <form className="search-wrapper">
      <input
        className="nav-right"
        type="text"
        placeholder="Search for articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default Searchbar;