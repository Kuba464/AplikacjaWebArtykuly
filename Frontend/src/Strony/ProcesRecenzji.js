import React from "react";

const steps = [
  {
    title: "Przesłanie artykułu",
    desc: "Autor przesyła artykuł za pośrednictwem e-maila podanego w sekcji Kontakt. Prosimy o dołączenie pliku PDF oraz krótkiego streszczenia.",
  },
  {
    title: "Wstępna ocena redakcyjna",
    desc: "Redaktor naczelny ocenia, czy artykuł spełnia podstawowe wymagania formalne i tematyczne. Ten etap trwa do 7 dni roboczych.",
  },
  {
    title: "Recenzja naukowa",
    desc: "Artykuł trafia do co najmniej dwóch niezależnych recenzentów, którzy oceniają jego wartość naukową, oryginalność i poprawność metodologiczną.",
  },
  {
    title: "Decyzja redakcji",
    desc: "Na podstawie recenzji redakcja podejmuje decyzję: akceptacja, prośba o poprawki lub odrzucenie. Autor otrzymuje szczegółowe uzasadnienie.",
  },
  {
    title: "Publikacja",
    desc: "Po akceptacji artykuł jest redagowany, a następnie publikowany w odpowiednim wydaniu czasopisma i udostępniany społeczności naukowej.",
  },
];

function ProcesRecenzji() {
  return (
    <div className="recenzje-page">

      <div className="recenzje-hero">
        <div className="sec-label">Dla autorów</div>
        <h1 className="sec-title">Proces recenzji</h1>
        <p className="sec-desc">
          Stosujemy model podwójnie ślepej recenzji, w którym ani autor, ani recenzenci
          nie znają swoich tożsamości. Gwarantuje to obiektywność i rzetelność oceny.
        </p>
      </div>

      <div className="recenzje-steps">
        {steps.map((step, i) => (
          <div className="recenzje-step" key={i}>
            <div className="step-num">0{i + 1}</div>
            <div className="step-body">
              <div className="step-title">{step.title}</div>
              <p className="step-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="recenzje-footer">
        <p>
          Naszym celem jest utrzymanie najwyższych standardów jakości naukowej.
          Pytania dotyczące procesu recenzji kieruj na adres redakcji.
        </p>
      </div>

    </div>
  );
}

export default ProcesRecenzji;
