
import styles from "./signUp.module.css"
import { Link, useNavigate } from "react-router-dom"
import useAppContext from "../../store/AppContext"
import { useEffect } from "react";


export const SignUp = () => {

    const { actions, store } = useAppContext();
    const { email, password, username } = store
    const navigate = useNavigate();

    useEffect(() => {
        actions.setUsername('')
        actions.setEmail('')
        actions.setPassword('')
    }, [])


    const signUp = (username: string, email: string, password: string) => {
        actions.signUp(username, email, password)

        navigate('/in')
    }


    return (
        <div className={`container d-flex align-items-center justify-content-between mt-5 ${styles.container}`}>
            <div className="bg-light p-4 rounded row d-flex mx-auto align-items-center">
                <div className="col-12 col-sm-4">
                    <form onSubmit={() => signUp(username, email, password)}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label fs-5">Usuario</label>
                            <input type="text" className="form-control" placeholder="Correo electrónico" id="username" aria-describedby="username" value={username} onChange={(e) => actions.setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label fs-5">Email</label>
                            <input type="email" className="form-control" placeholder="Correo electrónico" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => actions.setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label fs-5">Contraseña</label>
                            <input type="password" className="form-control" placeholder="Contraseña segura" id="exampleInputPassword1" value={password} onChange={(e) => actions.setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-dark mt-3">Registrarse</button>
                    </form>
                    <p className="mt-3 text-secondary">¿Ya estás registrado? <Link className="text-decoration-none" to="/login">¡Inicia sesión!</Link></p>
                </div>
                <div className="col-12 col-sm-8">
                    <h1>Regístrate en el mejor foro  sobre Empleo</h1>
                    <ul className="fs-4 mt-5 lh-lg">
                        <li>Temas sobre empleo, curriculum vitae, plataformas, trámites y mucho más</li>
                        <li>Guarda tus temas favoritos.</li>
                        <li>Interactúa con otros usuarios a través de los Temas.</li>
                        <li>Encuentra tu trabajo ideal.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
