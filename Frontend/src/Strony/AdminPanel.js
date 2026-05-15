import React from 'react';
import { useNavigate } from "react-router-dom";
    
function AdminPanel() {
    const navigate = useNavigate();

    if (localStorage.getItem("zalogowany") !== "true") {
        navigate("/admin/logowanie");
    }
    return (
        <div>
            <h1>Panel Administracyjny</h1> 
            <p>Witaj w panelu administracyjnym! Tutaj możesz zarządzać artykułami, użytkownikami i innymi zasobami aplikacji.</p>
            <button onClick={() => {
                localStorage.removeItem("zalogowany");
                navigate("/strona-glowna");
            }}>
                Wyloguj
            </button>
        </div>
    );
}
export default AdminPanel;