import React from "react"

function Hero(){
    return (
        <div className="hero-panel">
        <div className="deco-books">
            <div className="dbs dbs1"></div>
            <div className="dbs dbs2"></div>
            <div className="dbs dbs3"></div>
            <div className="dbs dbs4"></div>
            <div className="dbs dbs5"></div>
        </div>
        <div className="hero-text">
            <div className="hero-eyebrow">Najnowsze publikacje</div>
            <h2 className="hero-title">Odkrywaj najnowsze<br/> artykuły naukowe</h2>
            <a href="#" className="btn-hero">Przeglądaj artykuły</a>
        </div>
        </div>
    )
}

export default Hero;