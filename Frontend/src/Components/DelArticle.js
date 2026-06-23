import React, { useState } from "react";

function UsunArtykul({ article, onDelete }) {
    const [showConfirm, setShowConfirm] = useState(false);

    function deleteArticle() {
        fetch(`http://localhost:5000/api/articles/${article.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
        <>
            <div className="delete-article">
                <button className="btn-delete" onClick={() => setShowConfirm(true)}>
                    Usuń
                </button>
            </div>

            {showConfirm && (
                <div className="confirm-overlay">
                    <div className="confirm-modal">
                        <p className="confirm-text">Czy na pewno chcesz usunąć artykuł?</p>
                        <div className="confirm-actions">
                            <button className="btn-delete" onClick={() => { setShowConfirm(false); deleteArticle(); }}>
                                Usuń
                            </button>
                            <button className="confirm-cancel" onClick={() => setShowConfirm(false)}>
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UsunArtykul;
