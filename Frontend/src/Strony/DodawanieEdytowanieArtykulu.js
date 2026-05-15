import React from "react";
function DodawanieEdytowanieArtykulu() {
    return (
        <div>
            <button type="button" className="btn btn-secondary mt-2 mb-4">Powrót do panelu admina</button>
            <h1>Dodawaj / Edytuj Artykuł</h1>
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="tytul" className="control-label">Tytuł:</label>
                    <input type="text" className="form-control" id="tytul" />
                </div>
                <div className="form-group">
                    <label htmlFor="autorzy" className="control-label">Autorzy:</label>
                    <input type="text" className="form-control" id="autorzy" />
                    <button type="button" className="btn btn-secondary mt-2">Dodaj autora</button>
                </div>
                <div className="form-group">
                    <label htmlFor="data-publikacji" className="control-label">Data publikacji:</label>
                    <input type="date" className="form-control" id="data-publikacji" />
                </div>
                <div className="form-group">
                    <label htmlFor="zakres-stron" className="control-label">Zakres stron:</label>
                    <input type="text" className="form-control" id="zakres-stron" />
                </div>
                <div className="form-group">
                    <label htmlFor="kategoria" className="control-label">Kategoria:</label>
                    <select className="form-control" id="kategoria" defaultValue="">
                        <option value="" disabled hidden>Wybierz kategorię</option>
                        <option value="matematyka">Matematyka</option>
                        <option value="informatyka">Informatyka</option>
                        <option value="dydaktyka">Dydaktyka</option>
                        <option value="popularyzacja-nauki">Popularyzacja nauki</option>
                    </select>
                </div>
                <button type="button" className="btn btn-secondary mt-2" onClick={() => {  }}>
                    Dodaj plik PDF
                </button>
                <button type="submit" className="btn btn-primary">Zapisz</button>
            </form>
        </div>
    );
}
export default DodawanieEdytowanieArtykulu;