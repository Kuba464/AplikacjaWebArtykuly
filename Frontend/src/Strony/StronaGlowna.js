import  React from 'react';

function StronaGlowna() {
localStorage.removeItem("zalogowany");
  return (
    <div>
      <h1>Strona Główna</h1>
      <p> Witaj na naszej stronie! </p>
    </div>
  );
};

export default StronaGlowna;