import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

function Statystyki() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/admin/logowanie");
      return;
    }

    fetch("http://localhost:5000/api/stats", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="admin-loading">
        <p>Ładowanie statystyk...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="button-wrapper">
        <button
          className="back-button3"
          onClick={() => navigate("/admin")}
        >
          ← Wróć do panelu
        </button>
      </div>

      <section className="admin-hero1">
        <div className="admin-hero-content">
          <p className="site-title">Statystyki</p>
          <p className="admin-desc">
            Liczba otwarć poszczególnych artykułów przez użytkowników.
          </p>
        </div>
      </section>

      <section className="blog">
        <div className="sec-label">Dane</div>
        <h2 className="sec-title">Otwarcia artykułów</h2>

        <div className="stats-table-wrapper">
          <table className="stats-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tytuł artykułu</th>
                <th>Liczba otwarć</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.title}</td>
                  <td className="stats-views">{row.views}</td>
                </tr>
              ))}
              {stats.length === 0 && (
                <tr>
                  <td colSpan="3" className="stats-empty">Brak danych</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Statystyki;
