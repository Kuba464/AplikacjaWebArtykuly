import React from "react";

function Kontakt() {
  return (
    <div className="recenzje-page">

      <div className="recenzje-hero">
        <div className="sec-label">Napisz do nas</div>
        <h1 className="sec-title">Kontakt</h1>
        <p className="sec-desc">
          Masz pytania dotyczące publikacji, procesu recenzji lub współpracy?
          Chętnie odpowiemy.
        </p>
      </div>

      <div className="info-aut-footer">
        <div className="info-aut-col">
          <div className="step-title">E-mail</div>
          <p className="step-desc" style={{ marginBottom: "12px" }}>
            Pytania ogólne, zgłoszenia artykułów oraz korespondencja redakcyjna.
          </p>
          <a href="mailto:kontakt@redakcjanaukowa.pl" className="kontakt-link">
            kontakt@redakcjanaukowa.pl
          </a>
        </div>
        <div className="info-aut-col">
          <div className="step-title">Telefon</div>
          <p className="step-desc" style={{ marginBottom: "12px" }}>
            Dostępni w dni robocze w godzinach 9:00–16:00.
          </p>
          <span className="kontakt-link">+48 123 456 789</span>

        </div>
      </div>

      <div className="recenzje-steps" style={{ marginTop: "48px" }}>
        <div className="recenzje-step">
          <div className="step-num">!</div>
          <div className="step-body">
            <div className="step-title">Zgłoszenie artykułu</div>
            <p className="step-desc">
              Artykuł przesyłaj na powyższy adres e-mail z tytułem wiadomości
              „Zgłoszenie artykułu". Szczegóły znajdziesz na stronie{" "}
              <a href="/info-dla-autorow" style={{ color: "var(--accent)", fontWeight: 500 }}>
                Informacje dla autorów
              </a>.
            </p>
          </div>
        </div>
        <div className="recenzje-step">
          <div className="step-num">?</div>
          <div className="step-body">
            <div className="step-title">Pytania o recenzję</div>
            <p className="step-desc">
              W sprawie statusu recenzji lub szczegółów procesu zapoznaj się ze stroną{" "}
              <a href="/proces-recenzji" style={{ color: "var(--accent)", fontWeight: 500 }}>
                Proces recenzji
              </a>.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Kontakt;
