import styles from "./usefulButtons.module.css";
import { Link } from "react-router-dom";


export const UsefulButtons = () => {


    return (
        <div className="container">
            <div className="bg-light d-flex p-2 gap-3 justify-content-between rounded flex-wrap">
                <div className="d-flex gap-3">
                    <Link to={"/create-theme"} className={`btn ${styles.btn_orange}`}>Crear tema</Link>
                    <button className={`btn ${styles.bg_orange}`}>Mis temas</button>

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
