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
        const currentYear = new Date().getFullYear();
        const byYear = (year) => data.filter(a => new Date(a.publication_date).getFullYear() === year);
        const filtered = byYear(currentYear).length > 0 ? byYear(currentYear) : byYear(currentYear - 1);
        setArticles(filtered);
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
  return (
    <>
      <Siteheader /> //górny pasek z nazwą strony i tagline
      <Hero />       //baner z tytułem i przyciskiem
      <Categories /> //lista kategorii artykułów
      <div className="blog"> // główny kontener z artykułami
        <div className="blog-grid"> 
          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}

export default StronaGlowna;
