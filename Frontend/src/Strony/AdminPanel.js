import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Article from "../Components/Article";
import UsunArtykul from "../Components/DelArticle";
import EditArticle from "../Components/EditArticle";

function AdminPanel() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("zalogowany") !== "true") {
      navigate("/admin/logowanie");
    }
  }, [navigate]);
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
  return (
    <div>
      <h1>Panel Administracyjny</h1>
      <p>
        Witaj w panelu administracyjnym! Tutaj możesz zarządzać artykułami,
        użytkownikami i innymi zasobami aplikacji.
      </p>
      <button
        onClick={() => {
          localStorage.removeItem("zalogowany");
          navigate("/strona-glowna");
        }}
      >
        Wyloguj
      </button>
      <button onClick={() => navigate("/admin/dodaj-edytuj-artykul")}>
        Dodaj nowy artykuł
      </button>
      <div className="blog">
        <div className="blog-grid">
          {articles.map((article) => (
            <div key={article.id}>
              <Article article={article} />
              <UsunArtykul
                article={article}
                onDelete={() => {
                  setArticles(articles.filter((a) => a.id !== article.id));
                }}
              />
              <EditArticle
                article={article}
                onEdit={(id) => {
                  navigate(`/admin/edytuj-artykul/${id}`);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AdminPanel;
