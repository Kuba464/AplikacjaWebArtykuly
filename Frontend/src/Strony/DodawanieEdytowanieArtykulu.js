import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

import Autorzy from "../Components/Autorzy";
import SlowaKluczowe from "../Components/SlowaKluczowe";
import DragAndDropPDF from "../Components/DragDropPDF";

async function DodajArtykul(articleData, navigate) {
  try {
    const formData = new FormData();

    formData.append("title", articleData.tytul);
    formData.append("authors",JSON.stringify(articleData.autorzy));
    formData.append("tags",JSON.stringify(articleData.slowaKluczowe));
    formData.append("pages_from",articleData.zakresStronOd);
    formData.append("pages_to",articleData.zakresStronDo);
    formData.append("category",articleData.kategoria);
    if (articleData.pdfFile) {formData.append("pdf",articleData.pdfFile);}
    if (articleData.extraFile) {formData.append("extraFile",articleData.extraFile);}

    const response = await fetch(
      "http://localhost:5000/api/article",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    navigate("/admin");
  } catch (error) {
    console.error(error);

    alert("Błąd podczas dodawania artykułu");
  }
}

function DodawanieEdytowanieArtykulu() {
  const navigate = useNavigate();
  const isEditMode = false; // Możesz ustawić to na true, jeśli chcesz obsługiwać edycję artykułu
  const [pdfFile, setPdfFile] = useState(null);
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
  console.log(articleData);
  useEffect(() => {
    if (localStorage.getItem("zalogowany") !== "true") {
      navigate("/admin/logowanie");
    }
  }, [navigate]);

  return (
    <div>
      <button type="button" onClick={() => {navigate("/admin");}}>
        Powrót do panelu admina
      </button>
      <h1>{isEditMode ? "Edytuj" : "Dodaj"} artykuł</h1>
      <form className="form-horizontal">
        <div className="form-group">
          <label htmlFor="tytul" className="control-label">
            Tytuł:
          </label>
          <input type="text" className="form-control" id="tytul" value={articleData.tytul} onChange={(e) => setArticleData({...articleData, tytul: e.target.value})} />
        </div>
        <Autorzy autorzy={articleData.autorzy} setAutorzy={(autorzy) => setArticleData({...articleData, autorzy})} />
        <SlowaKluczowe slowaKluczowe={articleData.slowaKluczowe} setSlowaKluczowe={(slowaKluczowe) => setArticleData({...articleData, slowaKluczowe})} />
        <div className="form-group">
          <label htmlFor="zakres-stron" className="control-label">
            Zakres stron:
          </label>
          <input type="text" className="form-control" id="zakres-stron_od" value={articleData.zakresStronOd} onChange={(e) => setArticleData({...articleData, zakresStronOd: e.target.value})} />
          <label htmlFor="zakres-stron_do" className="control-label">
            -
          </label>
          <input type="text" className="form-control" id="zakres-stron_do" value={articleData.zakresStronDo} onChange={(e) => setArticleData({...articleData, zakresStronDo: e.target.value})} />
        </div>
        <div className="form-group">
          <label htmlFor="kategoria" className="control-label">
            Kategoria:
          </label>
          <select className="form-control" id="kategoria" value={articleData.kategoria} onChange={(e) => setArticleData({...articleData, kategoria: e.target.value})} >
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
          onChange={(file) => setArticleData({...articleData, pdfFile: file})}
         />
         <label htmlFor="extra-file" className="control-label">
            Dodatkowy plik (opcjonalnie):
          </label>
          <input type="file" className="form-control" id="extra-file" onChange={(e) => setArticleData({...articleData, extraFile: e.target.files[0]})} />
        <button type="submit" className="save-button" onClick={(e) => {
          e.preventDefault();
          DodajArtykul(articleData,navigate);
        }}>
          Zapisz
        </button>
      </form>
    </div>
  );
}

export default DodawanieEdytowanieArtykulu;
