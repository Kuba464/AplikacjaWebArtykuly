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
      <div key={i} className="blog">
        <div className="blog-grid">
          <h1>{roczniki[i].year}</h1>

          {articles
            .filter(
              (article) =>
                String(new Date(article.publication_date).getFullYear()) === String(roczniki[i].year),
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
      <Siteheader />

      {elements}
    </>
  );
}

export default Roczniki;
