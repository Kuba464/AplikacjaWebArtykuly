import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Article from "../Components/Article";
import UsunArtykul from "../Components/DelArticle";
import EditArticle from "../Components/EditArticle";

import "../styles/global.css";
import "../styles/Admin.css";

function AdminPanel() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("zalogowany") !== "true") {
      navigate("/admin/logowanie");
    }
  }, [navigate]);

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
    return (
      <div className="admin-loading">
        <p>Ładowanie artykułów...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="button-wrapper">
          <button
              className="back-button2"
              onClick={() => {
                localStorage.removeItem("zalogowany");
                navigate("/strona-glowna");
              }}
            >
              Wyloguj
            </button>
      </div>
      {/* HERO */}

      <section className="admin-hero1">
        
        <div className="admin-hero-content">
          <p className="site-title">Panel administracyjny</p>

          <p className="admin-desc">
            Zarządzaj artykułami i zawartością strony <br />
            Dodawaj nowe publikacje, edytuj istniejące artykuły oraz zarządzaj
            treściami w intuicyjnym panelu administracyjnym.
          </p>
        </div>

        <div className="deco-books">
          <div className="dbs dbs1"></div>
          <div className="dbs dbs2"></div>
          <div className="dbs dbs3"></div>
          <div className="dbs dbs4"></div>
          <div className="dbs dbs5"></div>
        </div>
      </section>

      {/* BLOG / ARTICLES */}
      <section className="blog">
        <div className="sec-label">Artykuły</div>

        <h2 className="sec-title">Lista publikacji</h2>

        <p className="sec-desc">
          Poniżej znajdziesz wszystkie dostępne artykuły wraz z możliwością ich
          edycji lub usunięcia.
        </p>
          <div className="admin-actions">
            
            <button
              className="back-button3"
              onClick={() => navigate("/admin/dodaj-edytuj-artykul")}
            >
              Dodaj nowy artykuł
            </button>
          </div>
        <div className="blog-grid">
          {articles.map((article) => (
            <div className="admin-article-card" key={article.id}>
              <Article article={article} />

              <div className="admin-card-actions">
                <EditArticle
                  article={article}
                  onEdit={(id) => {
                    navigate(`/admin/edytuj-artykul/${id}`);
                  }}
                />

                <UsunArtykul
                  article={article}
                  onDelete={() => {
                    setArticles(
                      articles.filter((a) => a.id !== article.id)
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminPanel;