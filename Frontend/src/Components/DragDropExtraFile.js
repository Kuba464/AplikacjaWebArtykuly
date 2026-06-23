import React, { useRef, useState } from "react";
import "../styles/Admin.css"

function DragAndDropExtraFile({ ExtraFile, existingFilePath, onChange, onRemoveExisting }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  // Funkcja pomocnicza wyciągająca nazwę pliku ze ścieżki (np. z "DB/ExtraFiles/12345.zip" wytnie "12345.zip")
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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };


const validateFile = (file) => {
  if (!file) return false;

  const fileName = file.name.toLowerCase();

  const blockedExtensions = [
    ".exe",
    ".bat",
    ".cmd",
    ".sh",
    ".js",
    ".php",
    ".html",
    ".htm",
    ".vbs",
    ".msi",
    ".jar",
    ".scr",
    ".ps1",
  ];

  const isBlocked = blockedExtensions.some((ext) =>
    fileName.endsWith(ext)
  );

  if (isBlocked) {
    alert("Ten typ pliku jest niedozwolony ze względów bezpieczeństwa.");
    return false;
  }

  if (file.size > MAX_FILE_SIZE) {
    alert("Plik może mieć maksymalnie 10 MB.");
    return false;
  }

  return true;
};
  // Funkcja czyszcząca obecny plik (nowy lub ten z bazy)
  const handleClearFile = (e) => {
    e.stopPropagation(); // Zapobiega otwarciu okna wyboru pliku po kliknięciu "Usuń"
    onChange(null);      // Czyścimy nowo wybrany plik
    if (onRemoveExisting) {
      onRemoveExisting(); // Informujemy komponent nadrzędny, że usuwamy też plik z bazy
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Resetujemy natywny input
    }
  };

  return (
    <div className="drag-drop-area">
      <label className="control-label">Dodaj plik dodatkowy (opcjonalnie):</label>

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
          position: "relative"
        }}
      >
        {/* Sytuacja 1: Użytkownik właśnie wybrał/upuścił nowy plik lokalny */}
        {ExtraFile ? (
          <div>
            <p style={{ color: "green", fontWeight: "bold" }}> Wybrano nowy plik do przesłania:</p>
            <p>{ExtraFile.name}</p>
            <button type="button" onClick={handleClearFile} className="save-button">
              Zmień / Usuń
            </button>
          </div>
        ) : 
        /* Sytuacja 2: Brak nowego pliku, ale mamy plik zapisany wcześniej na serwerze */
        existingFilePath ? (
          <div>
            <p style={{ color: "#c94a1a", fontWeight: "bold" }}> Aktualny plik na serwerze:</p>
            <p>{getFileNameFromPath(existingFilePath)}</p>
            <button type="button" onClick={handleClearFile} className="save-button">
              Zmień / Usuń stary plik
            </button>
          </div>
        ) : (
          /* Sytuacja 3: Brak jakiegokolwiek pliku (nowy artykuł) */
          <p style={{ color: "#636363", fontWeight: "bold" }} >Przeciągnij plik dodatkowy tutaj lub kliknij</p>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default DragAndDropExtraFile;