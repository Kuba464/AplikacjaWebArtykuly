import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css"

function Login() {
  const [login, setLogin] = useState("");
  const [haslo, setHaslo] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, haslo }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem("token", token);
        navigate("/admin");
      } else {
        alert("Nieprawidłowe dane logowania");
      }
    } catch {
      alert("Błąd połączenia z serwerem");
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