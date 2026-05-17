import  React from 'react';

import Siteheader from "../Components/Siteheader.js"
import Hero from "../Components/Hero.js"
import Categories from "../Components/Categories.js"

function StronaGlowna() {
localStorage.removeItem("zalogowany");
  return (
    <>
      <Siteheader/>
      <Hero/>
      <Categories/>
    </>
  
  );
};

export default StronaGlowna;