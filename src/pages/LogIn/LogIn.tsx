
import styles from "./logIn.module.css"
import { Link, useNavigate } from "react-router-dom"
import useAppContext from "../../store/AppContext"
import { useEffect } from "react";


export const LogIn = () => {

    const {actions, store} = useAppContext();
    const {email, password} = store
    const navigate = useNavigate();

    useEffect(() => {
        actions.setEmail('')
        actions.setPassword('')
      }, [])

    const handleLogIn = (email:string, password:string) => {
        actions.logIn(email, password);
        navigate("/")

    }

    return (
            <div className={`container d-flex justify-content-center ${styles.container}`}>
                <div className="bg-light p-4 rounded mt-5">
                    <h4 className="mb-4">Bienvenido a ForoJobs</h4>
                    <form onSubmit={() => handleLogIn(email,password)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Correo electrónico" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => actions.setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" placeholder="Contraseña segura" id="exampleInputPassword1" value={password} onChange={(e) => actions.setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-dark mt-3">Acceder</button>
                    </form>
                    <p className="mt-3 text-secondary">¿No estás registrado? <Link className="text-decoration-none" to="/signup">¡Registrate!</Link></p>
                </div>
            </div>
    )
}
