import React from "react";

const wymagania = [
  {
    icon: "01",
    title: "Format pliku",
    desc: "Artykuł należy przesłać w formacie PDF. Opcjonalnie można dołączyć plik źródłowy (LaTeX, Word).",
  },
  {
    icon: "02",
    title: "Język publikacji",
    desc: "Przyjmujemy artykuły w języku polskim oraz angielskim. Każdy artykuł powinien zawierać streszczenie w obu językach.",
  },
  {
    icon: "03",
    title: "Objętość",
    desc: "Zalecana objętość artykułu wynosi od 6 do 20 stron, wliczając rysunki, tabele i bibliografię.",
  },
  {
    icon: "04",
    title: "Sposób przesłania",
    desc: "Artykuł należy przesłać na adres e-mail podany w sekcji Kontakt. W tytule wiadomości prosimy wpisać \"Zgłoszenie artykułu\".",
  },
];

function InfoDlaAut() {
  return (
    <div className="recenzje-page">

      <div className="recenzje-hero">
        <div className="sec-label">Dla autorów</div>
        <h1 className="sec-title">Informacje dla autorów</h1>
        <p className="sec-desc">
          Zapraszamy do publikowania na łamach Planet Archives. Poniżej znajdziesz
          wszystkie informacje potrzebne do przesłania artykułu.
        </p>
      </div>

      <div className="recenzje-steps">
        {wymagania.map((w, i) => (
          <div className="recenzje-step" key={i}>
            <div className="step-num">{w.icon}</div>
            <div className="step-body">
              <div className="step-title">{w.title}</div>
              <p className="step-desc">{w.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="info-aut-footer">
        <div className="info-aut-col">
          <div className="step-title">Proces recenzji</div>
          <p className="step-desc">
            Każdy przesłany artykuł przechodzi przez proces podwójnie ślepej recenzji.
            Szczegóły znajdziesz na stronie <a href="/proces-recenzji">Proces recenzji</a>.
          </p>
        </div>
        <div className="info-aut-col">
          <div className="step-title">Kontakt</div>
          <p className="step-desc">
            Masz pytania? Napisz do nas — dane kontaktowe znajdziesz na stronie{" "}
            <a href="/kontakt">Kontakt</a>.
          </p>
        </div>
      </div>

    </div>
  );
}

export default InfoDlaAut;
