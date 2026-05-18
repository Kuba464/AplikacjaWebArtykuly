import React from "react";

const redakcja = [
  {
    imie: "prof. dr hab. Jakub Grabowski",
    rola: "Redaktor naczelny",
    dziedzina: "Informatyka",
    opis: "Profesor informatyki na Uniwersytecie Warszawskim, specjalizujący się w algorytmice i teorii złożoności. Autor ponad 100 publikacji naukowych i laureat wielu nagród za badania.",
  },
  {
    imie: "dr Weronika Skowron",
    rola: "Zastępca redaktora naczelnego",
    dziedzina: "Informatyka",
    opis: "Badaczka w dziedzinie sztucznej inteligencji i uczenia maszynowego. Prowadzi projekty badawcze we współpracy z instytucjami europejskimi.",
  },
  {
    imie: "dr Agnieszka Mozol",
    rola: "Sekretarz redakcji",
    dziedzina: "Matematyka",
    opis: "Zajmuje się topologią algebraiczną i geometrią różniczkową. Koordynuje proces recenzji i kontakt z autorami.",
  },
  {
    imie: "dr Jan Nowak",
    rola: "Redaktor tematyczny",
    dziedzina: "Dydaktyka",
    opis: "Ekspert w zakresie metodyki nauczania nauk ścisłych. Autor podręczników akademickich z matematyki i fizyki.",
  },
];

function Redakcja() {
  return (
    <div className="recenzje-page">

      <div className="recenzje-hero">
        <div className="sec-label">Zespół redakcyjny</div>
        <h1 className="sec-title">Redakcja</h1>
        <p className="sec-desc">
          Nasz zespół składa się z doświadczonych naukowców i praktyków,
          którzy wspólnie dbają o jakość i różnorodność publikowanych treści.
        </p>
      </div>

      <div className="redakcja-grid">
        {redakcja.map((osoba, i) => (
          <div className="redakcja-karta" key={i}>
            <div className="redakcja-avatar">
              {osoba.imie.split(" ").filter(w => /^[A-ZŁŚÓĄĆĘ]/.test(w) && w.length > 2).slice(0, 2).map(w => w[0]).join("")}
            </div>
            <div className="redakcja-body">
              <div className="redakcja-imie">{osoba.imie}</div>
              <div className="redakcja-rola">{osoba.rola}</div>
              <span className="art-tag2" style={{ display: "inline-block", marginBottom: "10px" }}>{osoba.dziedzina}</span>
              <p className="step-desc">{osoba.opis}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="recenzje-footer">
        Chcesz dołączyć do grona recenzentów?{" "}
        <a href="/kontakt" style={{ color: "var(--accent)", fontWeight: 500 }}>Napisz do nas</a>.
      </div>

    </div>
  );
}

export default Redakcja;
