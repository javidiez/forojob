import styles from "./navbar.module.css";
import logo from "../../assets/img/forojobs_logo.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                {/* Logo alineado a la izquierda */}
                <a className="navbar-brand" href="#">
                    <img className={styles.logo} src={logo} alt="Forojobs Logo" />
                </a>

                {/* Botón de menú para pantallas pequeñas */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menú alineado a la derecha */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link fs-4 active pe-5" aria-current="page">Inicio</Link>
                        </li>
                    </ul>
                    <div className="d-flex gap-2">
                        <button className="btn btn-dark py-0 d-flex align-items-center gap-1">
                            <span className="material-symbols-outlined fs-5">
                                login
                            </span>
                            <span>Acceder</span></button>
                        <button className="btn btn-light py-2 d-flex align-items-center gap-1">
                            <span className="material-symbols-outlined fs-5">
                                key
                            </span>
                            <span>Registro</span></button>
                    </div>

                </div>
            </div>
        </nav>
    );
};
