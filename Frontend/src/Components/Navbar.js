import React from "react";
import {BrowserRouter,Routes,Route,Link,useLocation} from "react-router-dom";
import ONas from "../Strony/OCzasopismie";
import AdminPanel from "../Strony/AdminPanel";
import StronaGlowna from "../Strony/StronaGlowna";
import Login from "../Strony/AdminLogowanie";
import InfoDlaAut from "../Strony/InfoDlaAut";
import ProcesRecenzji from "../Strony/ProcesRecenzji";
import Recenzenci from "../Strony/Recenzenci";
import Redakcja from "../Strony/Redakcja";
import Roczniki from "../Strony/Roczniki";

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
          <Link to="/o-nas">O Czasopismie</Link> |{" "}
          <Link to="/proces-recenzji">Proces Recenzji</Link> |{" "}
          <Link to="/recenzenci">Recenzenci</Link> |{" "}
          <Link to="/redakcja">Redakcja</Link> |{" "}
          <Link to="/roczniki">Roczniki</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<StronaGlowna />} />
        <Route path="/o-nas" element={<ONas />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/logowanie" element={<Login />} />
        <Route path="/info-dla-autorow" element={<InfoDlaAut />} />
        <Route path="/proces-recenzji" element={<ProcesRecenzji />} />
        <Route path="/recenzenci" element={<Recenzenci />} />
        <Route path="/redakcja" element={<Redakcja />} />
        <Route path="/roczniki" element={<Roczniki />} />
      </Routes>
    </>
  );
}
export default Navbar;