import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
    
function AdminPanel() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("zalogowany") !== "true") {
            navigate("/admin/logowanie");
        }
    }, [navigate]);
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
            <button onClick={() => navigate("/admin/dodaj-edytuj-artykul")}>
                Dodaj nowy artykuł
            </button>
        </div>
    );
}
export default AdminPanel;