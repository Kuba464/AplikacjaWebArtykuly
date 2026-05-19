import React from "react";

function EditArticle({ article, onEdit }) {
    return (
        <div className="edit-article">
            <button onClick={() => onEdit(article.id)}>
                Edit
            </button>
        </div>
    );
}

export default EditArticle;