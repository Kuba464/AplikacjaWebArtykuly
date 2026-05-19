import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Article from "../Components/Article";

function Szukaj() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const query = params.get("q");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, [query]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Wyniki wyszukiwania</h1>

      <p>Szukasz: {query}</p>
      <div className="blog-grid">
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Szukaj;