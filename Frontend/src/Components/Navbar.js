import React from "react";
import {BrowserRouter,Routes,Route,Link,useLocation} from "react-router-dom";
import Searchbar from "./Searchbar";

import "../styles/global.css";

function Navbar () {
  const location = useLocation();
  
  // navbar ukryty na /admin
  const hideNavbar = location.pathname.startsWith("/admin");
  return (
    <>
      {!hideNavbar && (
        <div className="navbar">
          <nav>
            <Link to="/">Strona główna</Link>

            <Link to="/roczniki">Roczniki</Link>

            <div className="wiecej">
              <div className="dropdown">
                <button className="dropbtn">Więcej</button>

                <div className="dropdown-content">
                  <Link to="/o-nas">O czasopiśmie</Link>
                  <Link to="/redakcja">Redakcja</Link>
                  <Link to="/info-dla-autorow">
                    Informacje dla autorów
                  </Link>
                  <Link to="/proces-recenzji">Proces recenzji</Link>
                  <Link to="/recenzenci">Recenzenci</Link>
                </div>
              </div>

              <div className="strzalka"></div>
            </div>

            <Link to="/kontakt">Kontakt</Link>
          </nav>
         <Searchbar />
        </div>
      )}

    </>
  );
}
export default Navbar;