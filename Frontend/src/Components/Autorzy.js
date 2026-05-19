import React from "react";

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

          <input
            type="text"
            className="form-control"
            value={autor}
            onChange={(e) =>
              handleAutorChange(index, e.target.value)
            }
            placeholder={`Autor ${index + 1}`}
          />

          <button
            type="button"
            className="usun_autora_button"
            onClick={() => usunAutora(index)}
          >
            Usuń
          </button>

        </div>
      ))}

      <button
        type="button"
        className="dodaj_autora_button"
        onClick={dodajAutora}
      >
        Dodaj autora
      </button>
    </div>
  );
}

export default Autorzy;