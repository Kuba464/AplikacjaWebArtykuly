import React from "react";

function EditArticle({ article, onEdit }) {
    return (
        <div className="edit-article">
            <button className="btn-edit" onClick={() => onEdit(article.id)}>
                Edytuj
            </button>
        </div>
    );
}

export default EditArticle;