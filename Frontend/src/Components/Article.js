import React from "react";

function Article({ article }) {
  // Bezpieczne wyciągnięcie nazwy pliku PDF
  const pdfFileName = article.pdf_path
    ?.replace(/\\/g, "/")   // Windows \ → /
    .match(/[^/]+$/)?.[0];  // tylko nazwa pliku

  const handleOpenPdf = () => {
    if (!pdfFileName) return;

    window.open(
      `http://localhost:5000/DB/PdfFiles/${pdfFileName}`,
      "_blank"
    );
  };

  return (
    <div className="article">
      <div className="art-tags">
        <span className="art-tag">{article.category}</span>
      </div>

      <div
        className="art-title"
        onClick={handleOpenPdf}
        style={{ cursor: "pointer" }}
      >
        {article.title}
      </div>

      <p className="art-pages">
        {article.pages_from}–{article.pages_to}
      </p>

      {article.tags && (
        <div className="art-tags2">
          {article.tags.split(", ").map((tag, index) => (
            <span className="art-tag2" key={index}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="art-meta">
        <span>{article.publication_date}</span>

        <div className="authors">
          {article.authors.split(", ").map((author, index) => (
            <span className="art-author" key={index}>
              {author}
              <br />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Article;