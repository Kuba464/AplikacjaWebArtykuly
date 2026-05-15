import React from "react";
import {BrowserRouter,Routes,Route,Link,useLocation} from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar.js";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;