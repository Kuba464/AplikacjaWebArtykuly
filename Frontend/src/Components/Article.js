import React from "react";

function Article({ article }) {
  return (
    <div className="article">
      <div className="art-tags">
        <span className="art-tag">{article.category}</span>
      </div>

      <div className="art-title">{article.title}</div>

      <p className="art-pages">
        {article.pages_from}–{article.pages_to}
      </p>

      {article.tags && (
        <div className="art-tags2">
          {article.tags.split(", ").map((tag, index) => (
            <span className="art-tag2" key={index}>{tag}</span>
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
