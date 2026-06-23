import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar.js";
import Topbar from "./Components/Topbar.js"
// Routy
import ONas from "./Strony/OCzasopismie";
import AdminPanel from "./Strony/AdminPanel";
import StronaGlowna from "./Strony/StronaGlowna";
import Login from "./Strony/AdminLogowanie";
import InfoDlaAut from "./Strony/InfoDlaAut";
import ProcesRecenzji from "./Strony/ProcesRecenzji";
import Recenzenci from "./Strony/Recenzenci";
import Redakcja from "./Strony/Redakcja";
import Roczniki from "./Strony/Roczniki";
import DodawanieEdytowanieArtykulu from "./Strony/DodawanieEdytowanieArtykulu";
import Kontakt from "./Strony/Kontakt";
import Szukaj from "./Strony/Szukaj";
import Footer from "./Components/Footer.js";
import Statystyki from "./Strony/Statystyki";
import Kategoria from "./Strony/Kategoria.js";

function App() {
  
  return (
    <BrowserRouter>
    <Topbar />
      <Navbar />
      <Routes>
        <Route path="/" element={<StronaGlowna />} />
        <Route path="/o-nas" element={<ONas />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/logowanie" element={<Login />} />
        <Route path="/info-dla-autorow" element={<InfoDlaAut />} />
        <Route path="/proces-recenzji" element={<ProcesRecenzji />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/recenzenci" element={<Recenzenci />} />
        <Route path="/redakcja" element={<Redakcja />} />
        <Route path="/roczniki" element={<Roczniki />} />
        <Route path="/admin/dodaj-edytuj-artykul" element={<DodawanieEdytowanieArtykulu />} />
        <Route path="/admin/edytuj-artykul/:id" element={<DodawanieEdytowanieArtykulu />} />
        <Route path="/szukaj" element={<Szukaj />} />
        <Route path="/admin/statystyki" element={<Statystyki />} />
        <Route path="/kategoria/:category" element={<Kategoria />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;