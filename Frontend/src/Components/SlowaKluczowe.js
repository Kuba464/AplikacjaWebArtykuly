import React, { useState } from "react";

function SlowaKluczowe() {
  const [slowaKluczowe, setSlowaKluczowe] = useState([""]);

  const handleSlowoChange = (index, value) => {
    const noweSlowa = [...slowaKluczowe];
    noweSlowa[index] = value;
    setSlowaKluczowe(noweSlowa);
  };

  const dodajSlowo = () => {
    setSlowaKluczowe([...slowaKluczowe, ""]);
  };

  const usunSlowo = (index) => {
    const noweSlowa = slowaKluczowe.filter((_, i) => i !== index);
    setSlowaKluczowe(noweSlowa);
  };

  return (
    <div className="form-group">
      <label className="control-label">Słowa kluczowe:</label>

      {slowaKluczowe.map((slowo, index) => (
        <div key={index} className="d-flex gap-2 mb-2">
          <input
            type="text"
            className="form-control"
            value={slowo}
            onChange={(e) => handleSlowoChange(index, e.target.value)}
            placeholder={`Słowo kluczowe ${index + 1}`}
          />
          <button type="button" className="btn btn-danger" onClick={() => usunSlowo(index)}>
            Usuń
          </button>
        </div>
      ))}

      <button type="button" className="btn btn-secondary mt-2" onClick={dodajSlowo}>
        Dodaj słowo kluczowe
      </button>
    </div>
  );
}

export default SlowaKluczowe;
