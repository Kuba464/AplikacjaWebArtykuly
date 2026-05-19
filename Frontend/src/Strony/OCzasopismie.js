import React from "react";

const wartosci = [
  {
    title: "Rzetelność naukowa",
    desc: "Każdy artykuł przechodzi przez rygorystyczny proces podwójnie ślepej recenzji, gwarantując najwyższe standardy merytoryczne.",
  },
  {
    title: "Interdyscyplinarność",
    desc: "Łączymy nauki humanistyczne, społeczne i przyrodnicze, tworząc przestrzeń dla badań przekraczających granice dyscyplin.",
  },
  {
    title: "Otwartość",
    desc: "Wierzymy w otwarty dostęp do wiedzy. Nasze artykuły są dostępne bezpłatnie dla każdego czytelnika.",
  },
  {
    title: "Różnorodność",
    desc: "Publikujemy prace autorów na każdym etapie kariery naukowej — od doktorantów po profesorów.",
  },
];

const statystyki = [
  { liczba: "120+", opis: "opublikowanych artykułów" },
  { liczba: "40+", opis: "recenzentów" },
  { liczba: "4", opis: "kategorie tematyczne" },
  { liczba: "2019", opis: "rok założenia" },
];

function ONas() {
  return (
    <div className="recenzje-page">

      <div className="recenzje-hero">
        <div className="sec-label">O nas</div>
        <h1 className="sec-title">O czasopiśmie</h1>
        <p className="sec-desc">
          Planet Archives to czasopismo naukowe poświęcone interdyscyplinarnym
          badaniom nad kulturą, społeczeństwem i naukami ścisłymi.
          Publikujemy artykuły, które łączą perspektywy różnych dziedzin nauki.
        </p>
      </div>

      <div className="onas-stats">
        {statystyki.map((s, i) => (
          <div className="onas-stat" key={i}>
            <div className="onas-stat-liczba">{s.liczba}</div>
            <div className="onas-stat-opis">{s.opis}</div>
          </div>
        ))}
      </div>

      <div className="onas-section-label">
        <div className="sec-label" style={{ marginTop: "56px", marginBottom: "24px" }}>Nasze wartości</div>
      </div>

      <div className="recenzje-steps">
        {wartosci.map((w, i) => (
          <div className="recenzje-step" key={i}>
            <div className="step-num">0{i + 1}</div>
            <div className="step-body">
              <div className="step-title">{w.title}</div>
              <p className="step-desc">{w.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="info-aut-footer" style={{ marginTop: "48px" }}>
        <div className="info-aut-col">
          <div className="step-title">Historia</div>
          <p className="step-desc">
            Planet Archives powstało w 2019 roku z inicjatywy grupy naukowców
            przekonanych, że wiedza powinna być dostępna dla wszystkich.
            Od początku stawiamy na jakość, otwartość i interdyscyplinarność.
          </p>
        </div>
        <div className="info-aut-col">
          <div className="step-title">Dołącz do nas</div>
          <p className="step-desc">
            Jesteś naukowcem i chcesz opublikować swój artykuł? Zapoznaj się
            z{" "}<a href="/info-dla-autorow" style={{ color: "var(--accent)", fontWeight: 500 }}>informacjami dla autorów</a>{" "}
            lub napisz do nas na stronie{" "}
            <a href="/kontakt" style={{ color: "var(--accent)", fontWeight: 500 }}>Kontakt</a>.
          </p>
        </div>
      </div>

    </div>
  );
}

export default ONas;
