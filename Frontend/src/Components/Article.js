import React from "react";

function Article({ article }) {
  // PDF
  const pdfFileName = article.pdf_path
    ?.replace(/\\/g, "/")
    .match(/[^/]+$/)?.[0];

  const handleOpenPdf = () => {
    if (!pdfFileName) return;

    window.open(
      `http://localhost:5000/DB/PdfFiles/${pdfFileName}`,
      "_blank"
    );
  };

  // EXTRA FILE
  const extraFileName = article.extra_file_path
    ?.replace(/\\/g, "/")
    .match(/[^/]+$/)?.[0];

  const handleOpenExtra = () => {
    if (!extraFileName) return;

    window.open(
      `http://localhost:5000/DB/ExtraFiles/${extraFileName}`,
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

      {/* TAGS + EXTRA FILE ROW */}
      <div className="tagsandextrefile">

        {/* TAGS */}
        {article.tags && (
          <div className="art-tags2">
            {article.tags.split(", ").map((tag, index) => (
              <span className="art-tag2" key={index}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* EXTRA FILE BUTTON (tylko jeśli istnieje) */}
        {extraFileName && (
          <button
            className="extra-file-btn"
            onClick={handleOpenExtra}
          >
            Extra file
          </button>
        )}

      </div>

      <div className="art-meta">
          <span>{article.publication_date?.split("T")[0]}</span>

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