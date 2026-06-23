import React from "react";
import { useEffect, useState } from "react";
import Article from "../Components/Article";

import Siteheader from "../Components/Siteheader.js";

function Roczniki() {
  const [roczniki, setRoczniki] = useState([]);
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

  useEffect(() => {
    fetch("http://localhost:5000/api/roczniki")
      .then((res) => res.json())
      .then((data) => {
        setRoczniki(data);
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
  const elements = [];

  for (let i = 0; i < roczniki.length; i++) {
    elements.push(
      <div key={i} className="blog rocznik-section">
        <div className="blog-grid">
          <h1 className="rocznik-title">{roczniki[i].year}</h1>

          {articles
            .filter(
              (article) =>
                String(new Date(article.publication_date).getFullYear()) ===
                String(roczniki[i].year),
            )
            .map((article) => (
              <Article key={article.id} article={article} />
            ))}
        </div>
      </div>,
    );
  }

  return (
    <>
      <div className="recenzje-hero">
        <div className="sec-label">Zbiory archiwalne</div>
        <h1 className="sec-title">Roczniki</h1>
        <p className="sec-desc">
          Roczniki gromadzą publikacje z poszczególnych lat, umożliwiając
          wygodne przeglądanie dorobku naukowego naszego czasopisma.
        </p>
      </div>

      {elements}
    </>
  );
}

export default Roczniki;
