import React from "react";

function UsunArtykul({ article, onDelete }) {

    function deleteArticle() {
        fetch(`http://localhost:5000/api/articles/${article.id}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.ok) {
                console.log("Artykuł został usunięty.");
                onDelete();
            } else {
                console.error("Nie można usunąć artykułu.");
            }
        })
        .catch((error) => {
            console.error("Błąd podczas usuwania artykułu:", error);
        });
    }

    return (
        <div className="delete-article">
            <button onClick={deleteArticle}>
                Delete
            </button>
        </div>
    );
}

export default UsunArtykul;