import React from "react";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className="categories">
      <div className="cat-grid">
        <Link to="/kategoria/Informatyka" className="cat-cell">
          Informatyka
        </Link>

        <Link to="/kategoria/Matematyka" className="cat-cell">
          Matematyka
        </Link>

        <Link to="/kategoria/Dydaktyka" className="cat-cell">
          Dydaktyka
        </Link>

        <Link to="/kategoria/Popularyzacja%20nauki" className="cat-cell">
          Popularyzacja nauki
        </Link>
      </div>
    </div>
  );
}

export default Categories;