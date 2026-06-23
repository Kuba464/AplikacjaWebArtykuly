import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Article from "../Components/Article";

function Kategoria() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/articles_by_categories/${encodeURIComponent(
        decodedCategory
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Błąd pobierania artykułów z kategorii:", err);
        setLoading(false);
      });
  }, [decodedCategory]);

  if (loading) {
    return <p>Ładowanie artykułów...</p>;
  }

  return (
    <div className="category-page">
      <div className="recenzje-hero">
        <div className="sec-label">Kategoria</div>

        <h1 className="sec-title">{decodedCategory}</h1>

        <p className="sec-desc">
          Przeglądasz artykuły przypisane do wybranej kategorii tematycznej.
        </p>
      </div>

      <div className="blog-grid">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Article key={article.id} article={article} />
          ))
        ) : (
          <p className="no-results">
            Brak artykułów w tej kategorii.
          </p>
        )}
      </div>
    </div>
  );
}

export default Kategoria;