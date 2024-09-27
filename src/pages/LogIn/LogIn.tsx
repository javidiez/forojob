
import styles from "./logIn.module.css"
import { Link, useNavigate } from "react-router-dom"
import useAppContext from "../../store/AppContext"
import { useEffect } from "react";


export const LogIn = () => {

    const { actions, store } = useAppContext();
    const { email, password } = store
    const navigate = useNavigate();

    useEffect(() => {
        actions.setEmail('')
        actions.setPassword('')
    }, [])

    const handleLogIn = (email: string, password: string) => {
        actions.logIn(email, password);
        navigate("/")

    }

    return (
        <div className={`container d-flex align-items-center justify-content-between mt-5 ${styles.container}`}>
            <div className="bg-light p-4 rounded row d-flex mx-auto align-items-center">
                <div className="col-12 col-sm-7">
                    <h1>Entra al foro más popular sobre Empleo</h1>
                    <ul className="fs-4 mt-5 lh-lg">
                        <li>Temas sobre empleo, curriculum vitae, plataformas, trámites y mucho más</li>
                        <li>Guarda tus temas favoritos.</li>
                        <li>Interactúa con otros usuarios a través de los Temas.</li>
                        <li>Encuentra tu trabajo ideal.</li>
                    </ul>
                </div>
                <div className="col-12 col-sm-5">
                    <form onSubmit={() => handleLogIn(email, password)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label fs-5">Email</label>
                            <input type="email" className={`form-control ${styles.input_text}`} placeholder="Correo electrónico" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => actions.setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label fs-5">Contraseña</label>
                            <input type="password" className="form-control" placeholder="Contraseña segura" id="exampleInputPassword1" value={password} onChange={(e) => actions.setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-dark mt-3">Acceder</button>
                    </form>
                    <p className="mt-3 text-secondary">¿No estás registrado? <Link className="text-decoration-none" to="/signup">¡Registrate!</Link></p>
                </div>
            </div>
        </div>
    )
}
