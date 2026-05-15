import React from "react";
import {BrowserRouter,Routes,Route,Link,useLocation} from "react-router-dom";
import ONas from "../Strony/ONas";
import AdminPanel from "../Strony/AdminPanel";
import StronaGlowna from "../Strony/StronaGlowna";
import Login from "../Strony/AdminLogowanie";
function Navbar () {
  const location = useLocation();

  // navbar ukryty na /admin
  const hideNavbar = location.pathname === "/admin" || location.pathname === "/admin/logowanie";
    if (location.pathname === "/admin/logowanie") {
      localStorage.removeItem("zalogowany");
    }
  return (
    <>
      {!hideNavbar && (
        <nav className="navbar">
          <Link to="/">Strona Główna</Link> |{" "}
          <Link to="/onas">O Nas</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<StronaGlowna />} />
        <Route path="/onas" element={<ONas />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/logowanie" element={<Login />} />
      </Routes>
    </>
  );
}
export default Navbar;