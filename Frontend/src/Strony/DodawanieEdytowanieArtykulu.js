import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Autorzy from "../Components/Autorzy";
import SlowaKluczowe from "../Components/SlowaKluczowe";
import DragAndDropPDF from "../Components/DragDropPDF";
import DragAndDropExtraFile from "../Components/DragDropExtraFile";
import "../styles/global.css";
import "../styles/Admin.css";

function DodawanieEdytowanieArtykulu() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);

  const [articleData, setArticleData] = useState({
    tytul: "",
    autorzy: [],
    slowaKluczowe: [],
    zakresStronOd: "",
    zakresStronDo: "",
    kategoria: "",
    pdfFile: null,
    extraFile: null,
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/admin/logowanie");
    }
  }, [navigate]);

  // POBIERANIE ARTYKUŁU DO EDYCJI
  useEffect(() => {
    if (!isEditMode) return;

    setLoading(true); // Warto ustawić stan ładowania na true przed fetchem

    fetch("http://localhost:5000/api/articles")
      .then((res) => res.json())
      .then((data) => {
        const article = data.find((a) => a.id === Number(id));

        if (!article) {
          console.error("Nie znaleziono artykułu");
          setLoading(false);
          return;
        }

        // Funkcja pomocnicza: jeśli dane z bazy są stringiem rozdzielonym przecinkami, zamienia je na tablicę
        const formatujNaTablice = (wartosc) => {
          if (!wartosc) return [];
          if (Array.isArray(wartosc)) return wartosc;
          return wartosc.split(", ").filter((item) => item.trim() !== "");
        };

        // Wewnątrz useEffect pobierającego artykuł:
        setArticleData({
          tytul: article.title || "",
          autorzy: formatujNaTablice(article.authors),
          slowaKluczowe: formatujNaTablice(article.tags),
          zakresStronOd: article.pages_from || "",
          zakresStronDo: article.pages_to || "",
          kategoria: article.category || "",
          // Przechowujemy ścieżki z bazy danych, aby wiedzieć, że pliki już tam są
          existingPdfPath: article.pdf_path || null,
          existingExtraFilePath: article.extra_file_path || null,
          // Nowe pliki na początku są puste
          pdfFile: null,
          extraFile: null,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, isEditMode]);

async function handleSubmit(e) {
  e.preventDefault();

  try {
    const formData = new FormData();

    // Jeśli jesteśmy w trybie edycji, dorzucamy id do body (tak jak sama dodałaś)
    if (isEditMode) {
      formData.append("id", id);
    }

    formData.append("title", articleData.tytul);
    
    // WRACAMY DO TWOJEGO SPRAWDZONEGO FORMATU JSON:
    formData.append("authors", JSON.stringify(articleData.autorzy));
    formData.append("tags", JSON.stringify(articleData.slowaKluczowe));
    formData.append("pages_from", articleData.zakresStronOd);
    formData.append("pages_to", articleData.zakresStronDo);
    formData.append("category", articleData.kategoria);

    if (articleData.pdfFile) {
      formData.append("pdf", articleData.pdfFile);
    }

    if (articleData.extraFile) {
      formData.append("extraFile", articleData.extraFile);
    }

    // Wszystko wysyłamy na Twój jeden, główny endpoint, zmieniając tylko metodę HTTP
    const response = await fetch("http://localhost:5000/api/article", {
      method: isEditMode ? "PUT" : "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.details || data.error || "Błąd serwera");
    }

    console.log("Zapisano pomyślnie:", data);
    navigate("/admin");
  } catch (error) {
    console.error(error);
    alert(
      isEditMode
        ? `Błąd podczas edycji artykułu: ${error.message}`
        : `Błąd podczas dodawania artykułu: ${error.message}`
    );
  }
}

  if (loading) {
    return <p>Ładowanie artykułu...</p>;
  }

  return (
  <div className="article-editor">
    {/* HERO */}
    <section className="editor-hero">
      <p className="hero-eyebrow">
        {isEditMode ? "Edycja artykułu" : "Nowy artykuł"}
      </p>

      <h1 className="hero-title">
        {isEditMode ? "Edytuj artykuł" : "Dodaj nowy artykuł"}
      </h1>

      <p className="editor-desc">
        Uzupełnij wszystkie informacje dotyczące publikacji, dodaj pliki oraz
        przypisz odpowiednią kategorię.
      </p>

      <div className="editor-books">
        <div className="b1"></div>
        <div className="b2"></div>
        <div className="b3"></div>
        <div className="b4"></div>
        <div className="b5"></div>
      </div>
    </section>

    <div className="editor-wrapper">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/admin")}
      >
        Powrót do panelu
      </button>

      <form className="form-horizontal" onSubmit={handleSubmit}>
        {/* TYTUŁ */}
        <div className="form-group1">
          <label htmlFor="tytul" className="control-label">
            Tytuł
          </label>

          <input style={{ textTransform: "none" }}
            type="text"
            className="form-group"
            id="tytul"
            value={articleData.tytul}
            onChange={(e) =>
              setArticleData({
                ...articleData,
                tytul: e.target.value,
              })
            }
          />
        </div>

        {/* AUTORZY */}
        <div className="form-group1">
          <label className="control-label">Autorzy</label>

          <Autorzy 
            autorzy={articleData.autorzy}
            setAutorzy={(autorzy) =>
              setArticleData({
                ...articleData,
                autorzy,
              })
            }
          />
        </div>

        {/* SŁOWA KLUCZOWE */}
        <div className="form-group1">
          <label className="control-label">Słowa kluczowe</label>

          <SlowaKluczowe
            slowaKluczowe={articleData.slowaKluczowe}
            setSlowaKluczowe={(slowaKluczowe) =>
              setArticleData({
                ...articleData,
                slowaKluczowe,
              })
            }
          />
        </div>

        {/* ZAKRES STRON */}
        <div className="form-group1">
          <label className="control-label">Zakres stron</label>

          <div className="pages-row">
            <input
              type="text"
              className="form-group"
              placeholder="Od"
              value={articleData.zakresStronOd}
              onChange={(e) =>
                setArticleData({
                  ...articleData,
                  zakresStronOd: e.target.value,
                })
              }
            />

            <div className="pages-divider">—</div>

            <input
              type="text"
              className="form-group"
              placeholder="Do"
              value={articleData.zakresStronDo}
              onChange={(e) =>
                setArticleData({
                  ...articleData,
                  zakresStronDo: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* KATEGORIA */}
        <div className="form-group1">
          <label className="control-label">Kategoria</label>

          <select
            className="category-select"
            value={articleData.kategoria}
            onChange={(e) =>
              setArticleData({
                ...articleData,
                kategoria: e.target.value,
              })
            }
          >
            <div className="dropdown">
            <option className="control-label" value="" disabled hidden>
              Wybierz kategorię
            </option>

            <option style={{ textTransform: "none" }} value="Matematyka">Matematyka</option>
            <option style={{ textTransform: "none" }} value="Informatyka">Informatyka</option>
            <option style={{ textTransform: "none" }} value="Dydaktyka">Dydaktyka</option>
            <option style={{ textTransform: "none" }} value="Popularyzacja nauki">
              Popularyzacja nauki
            </option>
            </div>
          </select>
        </div>

        {/* PDF */}
        <div className="form-group">
          <label className="control-label">Plik PDF</label>

          <div className="upload-wrapper">
            <DragAndDropPDF
              pdfFile={articleData.pdfFile}
              existingFilePath={articleData.existingPdfPath}
              onChange={(file) =>
                setArticleData({
                  ...articleData,
                  pdfFile: file,
                })
              }
              onRemoveExisting={() =>
                setArticleData({
                  ...articleData,
                  existingPdfPath: null,
                })
              }
            />
          </div>
        </div>

        {/* DODATKOWY PLIK */}
        <div className="form-group">
          <label className="control-label">
            Dodatkowy plik
          </label>

          <div className="upload-wrapper">
            <DragAndDropExtraFile
              ExtraFile={articleData.extraFile}
              existingFilePath={articleData.existingExtraFilePath}
              onChange={(file) =>
                setArticleData({
                  ...articleData,
                  extraFile: file,
                })
              }
              onRemoveExisting={() =>
                setArticleData({
                  ...articleData,
                  existingExtraFilePath: null,
                })
              }
            />
          </div>
        </div>

        <button type="submit" className="save-button">
          {isEditMode ? "Zapisz zmiany" : "Dodaj artykuł"}
        </button>
      </form>
    </div>
  </div>
);
}

export default DodawanieEdytowanieArtykulu;
