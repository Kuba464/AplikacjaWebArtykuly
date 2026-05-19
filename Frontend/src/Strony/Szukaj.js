import React from "react";
import { useLocation } from "react-router-dom";

function Szukaj() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const query = params.get("q");

  return (
    <div style={{ padding: "40px" }}>
      <h1>Wyniki wyszukiwania</h1>

      <p>Szukasz: {query}</p>
    </div>
  );
}

export default Szukaj;