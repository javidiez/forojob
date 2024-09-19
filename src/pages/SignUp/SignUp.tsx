
import styles from "./signUp.module.css"
import { Link, useNavigate } from "react-router-dom"
import useAppContext from "../../store/AppContext"
import { useEffect } from "react";


export const SignUp = () => {

    const {actions, store} = useAppContext();
    const {email, password, username} = store
    const navigate = useNavigate();

    useEffect(() => {
      actions.setUsername('')
      actions.setEmail('')
      actions.setPassword('')
    }, [])
    

	const signUp = (username:string, email:string, password:string) => {
		actions.signUp(username, email, password)
		
		navigate('/in')
	}


    return (
            <div className={`container d-flex justify-content-center ${styles.container}`}>
                <div className="bg-light p-4 rounded mt-5">
                    <h4 className="mb-4">Registrate en ForoJobs</h4>
                    <form onSubmit={() => signUp(username, email, password)}>
                    <div className="mb-3">
                            <label htmlFor="username" className="form-label">Usuario</label>
                            <input type="text" className="form-control" placeholder="Correo electrónico" id="username" aria-describedby="username" value={username} onChange={(e) => actions.setUsername(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Correo electrónico" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => actions.setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" placeholder="Contraseña segura" id="exampleInputPassword1" value={password} onChange={(e) => actions.setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-dark mt-3">Registrarse</button>
                    </form>
                    <p className="mt-3 text-secondary">¿Ya estás registrado? <Link className="text-decoration-none" to="/login">¡Inicia sesión!</Link></p>
                </div>
            </div>
    )
}
