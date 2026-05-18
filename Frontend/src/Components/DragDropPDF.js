import React, { useRef, useState } from "react";

function DragAndDropPDF({ pdfFile, onChange }) {
  const fileInputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      onChange(file);
    } else {
      alert("Możesz dodać tylko plik PDF!");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];

    if (file && file.type === "application/pdf") {
      onChange(file);
    } else {
      alert("Możesz dodać tylko plik PDF!");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
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
        {pdfFile ? (<p>{pdfFile.name}</p>) : (<p>Przeciągnij plik PDF tutaj lub kliknij</p>)}
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
