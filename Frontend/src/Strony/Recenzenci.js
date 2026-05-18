import React from "react";

const recenzenci = [
  { imie: "prof. dr hab. Tomasz Maj", dziedzina: "Informatyka", uczelnia: "Politechnika Warszawska" },
  { imie: "dr Katarzyna Lis", dziedzina: "Matematyka", uczelnia: "Uniwersytet Jagielloński" },
  { imie: "dr hab. Marek Baran", dziedzina: "Dydaktyka", uczelnia: "Uniwersytet Gdański" },
  { imie: "prof. dr hab. Ewa Nowak", dziedzina: "Popularyzacja nauki", uczelnia: "Uniwersytet Wrocławski" },
  { imie: "dr Łukasz Piotrowicz", dziedzina: "Informatyka", uczelnia: "AGH w Krakowie" },
  { imie: "dr Anna Wilk", dziedzina: "Matematyka", uczelnia: "Uniwersytet Poznański" },
  { imie: "dr hab. Rafał Szymański", dziedzina: "Dydaktyka", uczelnia: "Uniwersytet Łódzki" },
  { imie: "prof. dr hab. Joanna Krawczyk", dziedzina: "Popularyzacja nauki", uczelnia: "Uniwersytet Śląski" },
];

function Recenzenci() {
  return (
    <div className="recenzje-page">

      <div className="recenzje-hero">
        <div className="sec-label">Nasi eksperci</div>
        <h1 className="sec-title">Recenzenci</h1>
        <p className="sec-desc">
          Recenzenci to niezależni eksperci z różnych dziedzin nauki, oceniający
          artykuły pod kątem wartości naukowej, oryginalności i rzetelności metodologicznej.
        </p>
      </div>

      <div className="recenzje-steps" style={{ marginBottom: "48px" }}>
        <div className="recenzje-step">
          <div className="step-num">!</div>
          <div className="step-body">
            <div className="step-title">Model podwójnie ślepej recenzji</div>
            <p className="step-desc">
              Ani autor, ani recenzent nie znają swoich tożsamości. Gwarantuje to
              pełną obiektywność oceny i eliminuje możliwość stronniczości.
            </p>
          </div>
        </div>
      </div>

      <div className="recenzenci-grid">
        {recenzenci.map((r, i) => (
          <div className="recenzenci-karta" key={i}>
            <div className="redakcja-avatar" style={{ width: "44px", height: "44px", fontSize: "15px" }}>
              {r.imie.split(" ").filter(w => /^[A-ZŁŚÓĄĆĘ]/.test(w) && w.length > 2).slice(0, 2).map(w => w[0]).join("")}
            </div>
            <div>
              <div className="redakcja-imie" style={{ fontSize: "15px" }}>{r.imie}</div>
              <div className="recenzenci-uczelnia">{r.uczelnia}</div>
              <span className="art-tag2" style={{ display: "inline-block", marginTop: "6px" }}>{r.dziedzina}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="recenzje-footer">
        Chcesz zostać recenzentem?{" "}
        <a href="/kontakt" style={{ color: "var(--accent)", fontWeight: 500 }}>Skontaktuj się z nami</a>.
      </div>

    </div>
  );
}

export default Recenzenci;
