import styles from "./usefulButtons.module.css";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../store/AppContext"
import { useState } from "react";

export const UsefulButtons = () => {

    const { store } = useAppContext();
    const { token } = store
    const navigate = useNavigate();
    const [filters, setFilters] = useState("");

    const createTheme = () => {
        navigate('/create-theme')
    }

    const myThemes = () => {
        navigate('/my-themes')
    }

    const favorteThemes = () => {
        navigate('/favorite-themes')
    }

    const handleSearch = () => {
        const queryParams = new URLSearchParams(filters).toString();
        if(filters){
        navigate(`/search-themes?${queryParams}`);
        }
      };

    return (
        <div className="container mt-5">
            <div className="bg-light d-flex p-2 gap-3 justify-content-between rounded flex-wrap">
                <div className="d-flex gap-3">
                    <button onClick={createTheme} className={`btn ${styles.bg_blue} text-light`}>Crear tema</button>
                    {token ?
                        <>
                            <button onClick={myThemes} className={`btn ${styles.btn_orange}`}>Mis temas</button>
                            <button onClick={favorteThemes} className={`btn ${styles.btn_orange}`}>Temas favoritos</button>
                        </>
                        : ""}
                </div>
                <div>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                        <button className={`btn ${styles.btn_orange}`} type="button" onClick={handleSearch}>Buscar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
