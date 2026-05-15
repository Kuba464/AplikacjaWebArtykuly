import React from "react";
import { useNavigate } from "react-router-dom";

import Autorzy from "../Components/Autorzy";
import SlowaKluczowe from "../Components/SlowaKluczowe";
import DragAndDropPDF from "../Components/DragDropPDF";

function DodawanieEdytowanieArtykulu() {
    const navigate = useNavigate();

    if (localStorage.getItem("zalogowany") !== "true") {
        navigate("/admin/logowanie");
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    navigate("/admin");
                }}
            >
                Powrót do panelu admina
            </button>

            <h1>Dodawaj / Edytuj Artykuł</h1>

            <form className="form-horizontal">

                <div className="form-group">
                    <label
                        htmlFor="tytul"
                        className="control-label"
                    >
                        Tytuł:
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        id="tytul"
                    />
                </div>

                <Autorzy />

                <SlowaKluczowe />

                <div className="form-group">
                    <label
                        htmlFor="data-publikacji"
                        className="control-label"
                    >
                        Data publikacji:
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        id="data-publikacji"
                    />
                </div>

                <div className="form-group">
                    <label
                        htmlFor="zakres-stron"
                        className="control-label"
                >
                        Zakres stron:
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        id="zakres-stron"
                    />
                </div>

                <div className="form-group">
                    <label
                        htmlFor="kategoria"
                        className="control-label"
                    >
                        Kategoria:
                    </label>

                    <select
                        className="form-control"
                        id="kategoria"
                        defaultValue=""
                    >
                        <option value="" disabled hidden>
                            Wybierz kategorię
                        </option>

                        <option value="matematyka">
                            Matematyka
                        </option>

                        <option value="informatyka">
                            Informatyka
                        </option>

                        <option value="dydaktyka">
                            Dydaktyka
                        </option>

                        <option value="popularyzacja-nauki">
                            Popularyzacja nauki
                        </option>
                    </select>
                </div>

                <DragAndDropPDF />

                <button
                    type="submit"
                    className="save-button"
                >
                    Zapisz
                </button>
            </form>
        </div>
    );
}

export default DodawanieEdytowanieArtykulu;