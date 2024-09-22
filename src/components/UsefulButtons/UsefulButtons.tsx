import styles from "./usefulButtons.module.css";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../store/AppContext"

export const UsefulButtons = () => {

    const { store } = useAppContext();
    const { token } = store
    const navigate = useNavigate();

    const createTheme = () => {
        navigate('/create-theme')
    }

    return (
        <div className="container mt-5">
            <div className="bg-light d-flex p-2 gap-3 justify-content-between rounded flex-wrap">
                <div className="d-flex gap-3">
                    <button onClick={createTheme} className={`btn ${styles.btn_orange}`}>Crear tema</button>
                    {token ?
                        <>
                            <button className={`btn ${styles.bg_orange}`}>Mis temas</button>
                            <button className={`btn ${styles.bg_orange}`}>Temas favoritos</button>
                        </>
                        : ""}
                </div>
                <div>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                        <button className={`btn ${styles.btn_orange}`} type="submit">Buscar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
