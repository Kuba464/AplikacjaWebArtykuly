import React, { useRef, useState } from "react";
import "../styles/Admin.css"

function DragAndDropPDF({ pdfFile, existingFilePath, onChange, onRemoveExisting }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  // Funkcja pomocnicza wyciągająca nazwę pliku ze ścieżki (np. z "DB/PdfFiles/MAT-26-001.pdf" wytnie "MAT-26-001.pdf")
  const getFileNameFromPath = (path) => {
    if (!path) return "";
    return path.substring(path.lastIndexOf("/") + 1);
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (validateFile(file)) {
    onChange(file);
  }
};

  const handleDrop = (e) => {
  e.preventDefault();
  setIsDragging(false);

  const file = e.dataTransfer.files[0];

  if (validateFile(file)) {
    onChange(file);
  }
};

const validateFile = (file) => {
  if (!file) return false;

  if (file.type !== "application/pdf") {
    alert("Możesz dodać tylko plik PDF!");
    return false;
  }

  if (file.size > MAX_FILE_SIZE) {
    alert("Plik PDF może mieć maksymalnie 10 MB.");
    return false;
  }

  return true;
};
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Funkcja czyszcząca obecny wybór (zarówno nowy plik, jak i stary z bazy)
  const handleClearFile = (e) => {
    e.stopPropagation(); // Zapobiega otwarciu systemowego okna wyboru pliku przy kliknięciu "Zmień / Usuń"
    onChange(null);      // Czyścimy nowo wybrany plik
    if (onRemoveExisting) {
      onRemoveExisting(); // Czyścimy informację o pliku z bazy danych w stanie rodzica
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Resetujemy natywny input
    }
  };

  return (
    <div className="drag-drop-area">
      <label className="control-label">Dodaj plik PDF:</label>

      <div
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: isDragging ? "2px solid blue" : "2px dashed gray",
          padding: "40px",
          textAlign: "center",
          cursor: "pointer",
          borderRadius: "10px",
          backgroundColor: isDragging ? "#f0f8ff" : "#fafafa",
        }}
      >
        {/* Sytuacja 1: Użytkownik upuścił/wybrał nowy plik lokalny */}
        {pdfFile ? (
          <div>
            <p style={{ color: "green", fontWeight: "bold" }}>Wybrano nowy plik do przesłania:</p>
            <p>{pdfFile.name}</p>
            <button type="button" onClick={handleClearFile} className="save-button">
              Zmień / Usuń
            </button>
          </div>
        ) : 
        /* Sytuacja 2: Brak nowego pliku, ale mamy plik zapisany wcześniej w bazie danych */
        existingFilePath ? (
          <div>
            <p style={{ color: "#c94a1a", fontWeight: "bold" }}>Aktualny plik na serwerze:</p>
            <p>{getFileNameFromPath(existingFilePath)}</p>
            <button type="button" onClick={handleClearFile} className="save-button">
              Zmień / Usuń stary plik
            </button>
          </div>
        ) : (
          /* Sytuacja 3: Brak pliku (czysty formularz dodawania) */
          <p style={{ color: "#636363", fontWeight: "bold" }}>Przeciągnij plik PDF tutaj lub kliknij</p>
        )}
      </div>

      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default DragAndDropPDF;