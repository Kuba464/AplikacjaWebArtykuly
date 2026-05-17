import React, { useEffect, useState } from "react";
import Article from "../Components/Article";

import Siteheader from "../Components/Siteheader.js";
import Hero from "../Components/Hero.js";
import Categories from "../Components/Categories.js";

function StronaGlowna() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Błąd pobierania artykułów:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Ładowanie artykułów...</p>;
  }

  localStorage.removeItem("zalogowany");
  return (
    <>
      <Siteheader />
      <Hero />
      <div className="blog-grid">
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
      <Categories />
    </>
  );
}

export default StronaGlowna;
