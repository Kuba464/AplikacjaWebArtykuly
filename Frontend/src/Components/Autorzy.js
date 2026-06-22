import React from "react";
import "../styles/Admin.css"
import { BsTrashFill } from "react-icons/bs";

function Autorzy({ autorzy, setAutorzy }) {

  const handleAutorChange = (index, value) => {
    const nowiAutorzy = [...autorzy];

    nowiAutorzy[index] = value;

    setAutorzy(nowiAutorzy);
  };

  const dodajAutora = () => {
    setAutorzy([...autorzy, ""]);
  };

  const usunAutora = (index) => {
    const nowiAutorzy = autorzy.filter((_, i) => i !== index);

    setAutorzy(nowiAutorzy);
  };

  return (
    <div className="form-group">
      <label className="control-label">
        Autorzy:
      </label>

      {autorzy.map((autor, index) => (
        <div key={index} className="d-flex gap-2 mb-2">

          <div className="author-row">
            <input
              type="text"
              className="authors-key-group"
              value={autor}
              onChange={(e) => handleAutorChange(index, e.target.value)}
              placeholder={`Autor ${index + 1}`}
            />

            <button
              type="button"
              className="authors-key-button"
              onClick={() => usunAutora(index)}
            >
              <BsTrashFill />
            </button>
          </div>

        </div>
      ))}

      <button
        type="button"
        className="back-button1"
        onClick={dodajAutora}
      >
        Dodaj autora
      </button>
    </div>
  );
}

export default Autorzy;