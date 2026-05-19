import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Autorzy from "../Components/Autorzy";
import SlowaKluczowe from "../Components/SlowaKluczowe";
import DragAndDropPDF from "../Components/DragDropPDF";
import DragAndDropExtraFile from "../Components/DragDropExtraFile";

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
    if (localStorage.getItem("zalogowany") !== "true") {
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
    <div>
      <button type="button" onClick={() => navigate("/admin")}>
        Powrót do panelu admina
      </button>

      <h1>{isEditMode ? "Edytuj" : "Dodaj"} artykuł</h1>

      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tytul" className="control-label">
            Tytuł:
          </label>

          <input
            type="text"
            className="form-control"
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

        <Autorzy
          autorzy={articleData.autorzy}
          setAutorzy={(autorzy) =>
            setArticleData({
              ...articleData,
              autorzy,
            })
          }
        />

        <SlowaKluczowe
          slowaKluczowe={articleData.slowaKluczowe}
          setSlowaKluczowe={(slowaKluczowe) =>
            setArticleData({
              ...articleData,
              slowaKluczowe,
            })
          }
        />

        <div className="form-group">
          <label className="control-label">Zakres stron:</label>

          <input
            type="text"
            className="form-control"
            value={articleData.zakresStronOd}
            onChange={(e) =>
              setArticleData({
                ...articleData,
                zakresStronOd: e.target.value,
              })
            }
          />

          <label className="control-label">-</label>

          <input
            type="text"
            className="form-control"
            value={articleData.zakresStronDo}
            onChange={(e) =>
              setArticleData({
                ...articleData,
                zakresStronDo: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label className="control-label">Kategoria:</label>

          <select
            className="form-control"
            value={articleData.kategoria}
            onChange={(e) =>
              setArticleData({
                ...articleData,
                kategoria: e.target.value,
              })
            }
          >
            <option value="" disabled hidden>
              Wybierz kategorię
            </option>
            <option value="Matematyka">Matematyka</option>
            <option value="Informatyka">Informatyka</option>
            <option value="Dydaktyka">Dydaktyka</option>
            <option value="Popularyzacja nauki">Popularyzacja nauki</option>
          </select>
        </div>

<DragAndDropPDF
  pdfFile={articleData.pdfFile}
  existingFilePath={articleData.existingPdfPath} // Przekazujemy ścieżkę z bazy
  onChange={(file) => setArticleData({ ...articleData, pdfFile: file })}
  onRemoveExisting={() => setArticleData({ ...articleData, existingPdfPath: null })} // Opcja usunięcia starego
/>
<DragAndDropExtraFile
  ExtraFile={articleData.extraFile}
  existingFilePath={articleData.existingExtraFilePath} // Przekazujemy ścieżkę z bazy
  onChange={(file) => setArticleData({ ...articleData, extraFile: file })}
  onRemoveExisting={() => setArticleData({ ...articleData, existingExtraFilePath: null })} // Opcja usunięcia starego
/>
        <button type="submit" className="save-button">
          {isEditMode ? "Zapisz zmiany" : "Dodaj artykuł"}
        </button>
      </form>
    </div>
  );
}

export default DodawanieEdytowanieArtykulu;
