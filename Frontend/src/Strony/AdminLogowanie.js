import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css"

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
  <div className="login-wrapper">
    <form className="login-panel" onSubmit={handleLogin}>
      <h2 className="login-title">Logowanie</h2>

      <input style={{ textTransform: "none" }}
        className="login-input"
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />

      <input style={{ textTransform: "none" }}
        className="login-input"
        type="password"
        placeholder="Hasło"
        value={haslo}
        onChange={(e) => setHaslo(e.target.value)}
      />

      <button className="login-button" type="submit">
        Zaloguj
      </button>
    </form>
  </div>
);
}

export default Login;