import React from "react";
import { BsTrashFill } from "react-icons/bs";

function SlowaKluczowe({
  slowaKluczowe,
  setSlowaKluczowe,
}) {

  const handleSlowoChange = (index, value) => {

    const noweSlowa = [...slowaKluczowe];

    noweSlowa[index] = value;

    setSlowaKluczowe(noweSlowa);
  };

  const dodajSlowo = () => {
    setSlowaKluczowe([
      ...slowaKluczowe,
      "",
    ]);
  };

  const usunSlowo = (index) => {

    const noweSlowa =
      slowaKluczowe.filter(
        (_, i) => i !== index
      );

    setSlowaKluczowe(noweSlowa);
  };

  return (
    <div className="form-group">

      <label className="control-label">
        Słowa kluczowe:
      </label>

      {slowaKluczowe.map((slowo, index) => (

        <div
          key={index}
          className="d-flex gap-2 mb-2"
        >
          <div className="author-row ">
          <input
            type="text"
            className="authors-key-group"
            value={slowo}
            onChange={(e) =>
              handleSlowoChange(
                index,
                e.target.value
              )
            }
            placeholder={`Słowo kluczowe ${index + 1}`}
          />

          <button
            type="button"
            className="authors-key-button"
            onClick={() => usunSlowo(index)}
          >
            <BsTrashFill />
          </button>
        </div>
        </div>
      ))}

      <button
        type="button"
        className="back-button1"
        onClick={dodajSlowo}
      >
        Dodaj słowo kluczowe
      </button>

    </div>
  );
}

export default SlowaKluczowe;