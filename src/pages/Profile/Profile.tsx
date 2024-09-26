import styles from "./profile.module.css"
import { useEffect, useRef, useState } from "react";
import useAppContext from "../../store/AppContext"
import { UsefulButtons } from "../../components/UsefulButtons/UsefulButtons";
import avatar from "../../assets/img/avatar.png"

export const Profile = () => {

    const { actions, store } = useAppContext();
    const { users, userId, name, lastname, userPhone, birthdate, userImage } = store;
    const [isImageUploading, setIsImageUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        actions.getUsers();
    }, []);

    const editUser = (name: string, lastname: string, phone: string, birthdate: Date) => {
        actions.editUser(name, lastname, phone, birthdate);
    }

    const openEditModal = (user: any) => {
        actions.setName(user.name);
        actions.setLastname(user.lastname);
        actions.setUserPhone(user.phone);
        actions.setBirthdate(user.birthdate);
    };

    const formatDate = (date: string | Date): string => {
        if (typeof date === 'string') {
            return date;  // Asumimos que la cadena ya está en formato YYYY-MM-DD
        } else if (date instanceof Date) {
            return date.toISOString().split('T')[0];  // Convertimos el objeto Date a cadena en formato YYYY-MM-DD
        }
        return '';  // En caso de que no sea ni string ni Date
    };

    const addImages = async (photo: string) => {
        setIsImageUploading(true); // Indicar que la imagen se está cargando
        try {
            const formData: any = new FormData();
            formData.append("file", photo);
            const response: any = await actions.addImages(formData);

            if (response?.url) {
                actions.setUserImage(response.url);
            } else {
                console.error("Error al recibir la URL de la imagen.");
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        } finally {
            setIsImageUploading(false); // Finalizar la carga de la imagen
        }
    };


    return (
        <>
        <UsefulButtons />
        <div className="container">
            
            <div className="row mt-4">
                <div className="col-12 col-sm-3">
                    <div className="position-relative">
                        {users
                            .filter(user => user.id == userId)
                            .map(user => (
                                <img
                                    src={user.image ? user.image : avatar}
                                    className={`${styles.profile_img} img-fluid rounded position-relative`}
                                    alt="Perfil"
                                />
                            ))
                        }
                        <input
                            type="file"
                            onChange={(e) => addImages(e.target.files[0])}
                            ref={fileInputRef}
                            className={`${styles.hidden_input}`}
                        />

                        {/* Ícono de lápiz que dispara el input file */}
                        <span
                            className={`material-symbols-outlined position-absolute ${styles.edit_icon}`}
                            onClick={() => fileInputRef.current.click()}
                        >
                            edit
                        </span>

                        {userImage && (
                            <button
                                onClick={() => {
                                    setIsImageUploading(true);
                                    actions.editUserImage(userImage).finally(() => setIsImageUploading(false));
                                }}
                                className={` ${styles.btn_orange} btn mt-2`}
                                disabled={isImageUploading}
                            >
                                Guardar
                            </button>
                        )}
                    </div>


                    <table className={`table table-borderles mt-3 ${styles.table}`}>
                        <thead>
                            <tr>
                                <th colSpan={4} className={`${styles.bg_blue} text-light`}>
                                    <h2 className="">Cuenta</h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="fs-5 d-flex align-items-center gap-2">
                                    <span className="material-symbols-outlined">
                                        notifications_active
                                    </span>
                                    Notificaciones
                                </td>
                            </tr>
                            <tr>
                                <td className="fs-5 d-flex align-items-center gap-2">
                                    <span className="material-symbols-outlined">
                                        construction
                                    </span>
                                    Preferencias
                                </td>
                            </tr>
                            <tr>
                                <td className="fs-5 d-flex align-items-center gap-2">
                                    <span className="material-symbols-outlined">
                                        thumb_up
                                    </span>
                                    Favoritos
                                </td>
                            </tr>
                            <tr>
                                <td className="fs-5 d-flex align-items-center gap-2">
                                    <span className="material-symbols-outlined">
                                        lock
                                    </span>
                                    Privacidad
                                </td>
                            </tr>
                            <tr>
                                <td className="fs-5 d-flex align-items-center gap-2">
                                    <span className="material-symbols-outlined">
                                        admin_panel_settings
                                    </span>
                                    Seguridad
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-12 col-sm-9">
                    <table className={`table table-borderles ${styles.table}`}>
                        <thead>
                            <tr className="">
                                <th className={`${styles.bg_blue} text-light`}>
                                    <div className="d-flex align-items-center gap-3">
                                        <h2 className="">Mi perfil</h2>
                                        {users
                                            .filter(user => user.id == userId)
                                            .map(user =>
                                                <>
                                                    <span className={`${styles.cursor_pointer} material-symbols-outlined pe-2`} data-bs-toggle="modal" data-bs-target={`#modalEditUser${user.id}`} onClick={() => openEditModal(user)}>
                                                        edit
                                                    </span>

                                                    <div className="modal fade" id={`modalEditUser${user.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog modal-lg">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">Editar usuario</h1>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body text-start">
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <label className="text-dark">Nombre</label>
                                                                            <input type="text" className='form-control' value={name} onChange={(e) => actions.setName(e.target.value)} />
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <label className="text-dark">Apellido</label>
                                                                            <input type="text" className='form-control' value={lastname} onChange={(e) => actions.setLastname(e.target.value)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-4">
                                                                        <div className="col-6">
                                                                            <label className="text-dark">Teléfono</label>
                                                                            <input type="text" className='form-control' value={userPhone ? userPhone : ""} onChange={(e) => actions.setUserPhone(e.target.value)} />
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <label className="text-dark">Fecha de nacimiento</label>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control"
                                                                                value={birthdate ? formatDate(birthdate) : ''}
                                                                                onChange={(e) => actions.setBirthdate(new Date(e.target.value))}
                                                                            />
                                                                        </div>


                                                                    </div>

                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                    <button onClick={() => editUser(name, lastname, userPhone, birthdate)} type="button" className={`btn ${styles.bg_blue} text-light`} data-bs-dismiss="modal">Editar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                    </div>

                                </th>
                                <th className={`${styles.bg_blue} text-light`}>
                                    <h2 className=""></h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users
                                .filter(user => user.id == userId)
                                .map(user => (
                                    <>
                                        <tr key={user.id}>
                                            <td className="fs-5">
                                                <label className="fw-bold">
                                                    Usuario
                                                </label>
                                                <p>{user.username}</p>
                                            </td>
                                            <td className="fs-5">
                                                <label className="fw-bold">
                                                    Email
                                                </label>
                                                <p>{user.email}</p>
                                            </td>
                                        </tr>
                                        <tr key={user.id}>
                                            <td className="fs-5">
                                                <label className="fw-bold">
                                                    Nombre
                                                </label>
                                                <p>{user.name}</p>
                                            </td>
                                            <td className="fs-5">
                                                <label className="fw-bold">
                                                    Apellido
                                                </label>
                                                <p>{user.lastname}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="fs-5">
                                                <label className="fw-bold">
                                                    Fecha de nacimiento
                                                </label>
                                                <p>{new Date(user.birthdate).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}</p>
                                            </td>
                                            <td className="fs-5">
                                                <label className="fw-bold">
                                                    Teléfono
                                                </label>
                                                <p>{user.phone ? user.phone : "Indefinido"}</p>
                                            </td>
                                        </tr>
                                        <tr>

                                            <td className="fs-5">
                                                <label className="fw-bold">
                                                    Rol
                                                </label>
                                                <p>
                                                    {user.role === "admin" ?
                                                        <span className={`badge rounded-pill ${styles.bg_blue}`}>Administrador</span>
                                                        :
                                                        user.role === "moderator" ?
                                                            <span className={`badge rounded-pill ${styles.btn_orange} mb-4`}>Moderador</span>
                                                            :
                                                            <span className={`badge rounded-pill bg-dark mb-4`}>Usuario</span>
                                                    }
                                                </p>
                                            </td>
                                            <td className="fs-5">
                                                <label className="fw-bold">
                                                    Fecha de registro
                                                </label>
                                                <p>{new Date(user.signup_date).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}</p>
                                            </td>
                                        </tr>


                                    </>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
        </>
    );
}
