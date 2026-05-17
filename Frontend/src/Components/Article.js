import React from "react";

function Article() {
  return (
    <div className="article">
      <div className="art-tags">
        <span className="art-tag">Informatyka</span>
      </div>

      <div className="art-title">
        Zastosowanie sztucznej inteligencji w analizie danych
      </div>

      <p className="art-pages">124–138</p>

      <div className="art-tags2">
        <span className="art-tag2">AI</span>
        <span className="art-tag2">Machine Learning</span>
        <span className="art-tag2">Python</span>
      </div>

      <div className="art-meta">
        <span>12 Mar 2026</span>
        <span className="art-author">Jan Kowalski</span>
      </div>
    </div>
  );
}

export default Article;
