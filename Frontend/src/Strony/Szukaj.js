import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Article from "../Components/Article";

function Szukaj() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const query = params.get("q") || "";
  const [articles, setArticles] = useState([]);

 useEffect(() => {
  if (query.trim() === "") {
    setArticles([]);
    return;
  }

  fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`)
    .then((res) => res.json())
    .then((data) => setArticles(data))
    .catch((err) => console.error(err));
}, [query]);

  return (
   <div className="search-page">
  <div className="search-hero">
    <div className="sec-label">Wyszukiwarka</div>

    <h1 className="sec-title">Wyniki wyszukiwania</h1>

  </div>

  <div className="blog-grid">
    {articles.length > 0 ? (
      articles.map((article) => (
        <Article key={article.id} article={article} />
      ))
    ) : (
      <p className="no-results">
        Nie znaleziono artykułów pasujących do tej frazy.
      </p>
    )}
  </div>
</div>
  );
}

export default Szukaj;