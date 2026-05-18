import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState("");
  const [haslo, setHaslo] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    // przykładowe dane
    if (login === "admin" && haslo === "1234") {
      localStorage.setItem("zalogowany", "true");
      navigate("/admin");

    } else {
      alert("Nieprawidłowe dane");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />

      <input
        type="password"
        placeholder="Hasło"
        value={haslo}
        onChange={(e) => setHaslo(e.target.value)}
      />

      <button type="submit">
        Zaloguj
      </button>
    </form>
  );
}

export default Login;