import styles from "./navbar.module.css";
import logo from "../../assets/img/forojobs_logo.png";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../../store/AppContext"

export const Navbar = () => {

    const { store, actions } = useAppContext();
    const { username, token } = store
    const navigate = useNavigate();

    const logOut = () => {
        actions.logOut();
        navigate("/")
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">

                <a className="navbar-brand" href="#">
                    <img className={styles.logo} src={logo} alt="Forojobs Logo" />
                </a>


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link fs-4 active pe-4" aria-current="page">Inicio</Link>
                        </li>
                    </ul>


                    <div className="d-flex gap-2">
                        {!token ?
                            <>
                                <Link to="/login" className="btn btn-dark py-0 d-flex align-items-center gap-1">
                                    <span className="material-symbols-outlined fs-5">
                                        login
                                    </span>
                                    <span>Acceder</span></Link>
                                <Link to="/signup" className="btn btn-light py-2 d-flex align-items-center gap-1">
                                    <span className="material-symbols-outlined fs-5">
                                        key
                                    </span>
                                    <span>Registro</span></Link>
                            </>

                            :

                            <div className="dropdown">

                                <button className="btn btn-dark dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="material-symbols-outlined fs-5">
                                        person
                                    </span>
                                    <span>{username}</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><a className="dropdown-item" href="#">Mi perfil</a></li>
                                    <li><a className="dropdown-item" href="#">Mis temas</a></li>
                                    <li><a onClick={logOut} className="dropdown-item text-danger" href="#">Cerrar sesió</a></li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};
