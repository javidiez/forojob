import styles from './admin.module.css'
import useAppContext from "../../store/AppContext"
import { useEffect } from "react";
import { Link } from 'react-router-dom';

export const Admin = () => {

    const { actions, store } = useAppContext();
    const { themes, comments, users, categories, categoryName } = store

    useEffect(() => {
        actions.getThemes();
        actions.getComments();
        actions.getUsers();
        actions.getCategories();
    }, [])

    const deleteTheme = (themeId: number) => {
        actions.deleteTheme(themeId);
    }

    const deactivateTheme = (themeId: number) => {
        actions.deactiveTheme(themeId, false);
    }

    const activeTheme = (themeId: number) => {
        actions.deactiveTheme(themeId, true);
    }

    const addCategory = () => {
        actions.addCategory();
    }

    const deleteCategory = (categoryId: number) => {
        actions.deleteCategory(categoryId);
    }

    const deleteComment = (commentId: number) => {
        actions.deleteComment(commentId)
    }

    const deactiveUser = (userId: number) => {
        actions.deactiveUser(userId, false);
    }

    const activeUser = (userId: number) => {
        actions.deactiveUser(userId, true);
    }


    return (
        <div className="container mt-5">
            <ul className="nav nav-pills mb-3 gap-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className={`${styles.btn_admin} btn active fs-5`} id="pills-theme-tab" data-bs-toggle="pill" data-bs-target="#pills-theme" type="button" role="tab" aria-controls="pills-theme" aria-selected="true">Temas</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className={`${styles.btn_admin} btn fs-5`} id="pills-comment-tab" data-bs-toggle="pill" data-bs-target="#pills-comment" type="button" role="tab" aria-controls="pills-comment" aria-selected="false">Comentarios</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className={`${styles.btn_admin} btn fs-5`} id="pills-users-tab" data-bs-toggle="pill" data-bs-target="#pills-users" type="button" role="tab" aria-controls="pills-users" aria-selected="false">Usuarios</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className={`${styles.btn_admin} btn fs-5`} id="pills-category-tab" data-bs-toggle="pill" data-bs-target="#pills-category" type="button" role="tab" aria-controls="pills-category" aria-selected="false">Categorías</button>
                </li>

            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-theme" role="tabpanel" aria-labelledby="pills-theme-tab" tabIndex={0}>
                    <div className="col-12">
                        <h2 className="mt-5 mb-3">Temas</h2>
                        <div className='table-responsive'>
                            <table className={`table  ${styles.table} text-secondary'`}>
                                <thead className='fs-5 table-dark'>
                                    <tr className=''>
                                        <th className=''>#</th>
                                        <th className=''>Tema</th>
                                        <th className=''>Usuario</th>
                                        <th className=''>Fecha</th>
                                        <th className=''></th>
                                    </tr>
                                </thead>
                                <tbody className='text-secondary'>
                                    {themes
                                        .sort((a, b) => { return new Date(b.date).getTime() - new Date(a.date).getTime(); })
                                        .map((theme, index) => (
                                            <tr key={theme.id}>
                                                <td className='fw-bold'>{index + 1}</td>
                                                <td className={`text-start`}><Link to={`/theme/${theme.id}`} className={`${styles.theme_link} text-dark`}>{theme.title}</Link></td>
                                                <td>{theme.user?.username}</td>
                                                <td>{new Date(theme.date).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}</td>
                                                <td className={`text-end text-nowrap ${styles.cursor_pointer}`}>
                                                    <span className="material-symbols-outlined pe-2">
                                                        edit
                                                    </span>
                                                    {theme.active === true ?
                                                        <>
                                                            <span className="material-symbols-outlined pe-2" data-bs-toggle="modal" data-bs-target={`#hideTheme${theme.id}`}>
                                                                visibility
                                                            </span>

                                                            <div className="modal fade" id={`hideTheme${theme.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">¿Desea desactivar el tema?</h1>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body text-start">
                                                                            <p className='fs-5 fw-bold mb-3'>El siguiente tema quedará oculto:</p>
                                                                            <p className='text-wrap'>{theme.title}</p>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                            <button onClick={() => deactivateTheme(theme.id)} type="button" className="btn btn-warning" data-bs-dismiss="modal">Desactivar</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>

                                                        :
                                                        <>
                                                            <span className="material-symbols-outlined pe-2" data-bs-toggle="modal" data-bs-target={`#hideTheme${theme.id}`}>
                                                                visibility_off
                                                            </span>

                                                            <div className="modal fade" id={`hideTheme${theme.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">¿Desea desactivar el tema?</h1>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body text-start">
                                                                            <p className='fs-5 fw-bold mb-3'>El siguiente tema se volverá a ver:</p>
                                                                            <p className='text-wrap'>{theme.title}</p>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                            <button onClick={() => activeTheme(theme.id)} type="button" className="btn btn-success" data-bs-dismiss="modal">Activar</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>


                                                    }


                                                    <span className="material-symbols-outlined" data-bs-toggle="modal" data-bs-target={`#modalTheme${theme.id}`}>
                                                        delete
                                                    </span>

                                                    <div className="modal fade" id={`modalTheme${theme.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">¿Desea eliminar el tema?</h1>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body text-start">
                                                                    <p className='fs-5 fw-bold'>Tema:</p>
                                                                    <p className='text-wrap'>{theme.title}</p>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                    <button onClick={() => deleteTheme(theme.id)} type="button" className="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade show" id="pills-comment" role="tabpanel" aria-labelledby="pills-comment-tab" tabIndex={0}>
                    <div className="col-12">
                        <h2 className="mt-5 mb-3">Comentarios</h2>
                        <div className='table-responsive'>
                            <table className={`table ${styles.table}`}>
                                <thead className='fs-5 table-dark'>                                    <tr>
                                    <th className=''>#</th>
                                    <th className=''>Comentario</th>
                                    <th className=''>Usuario</th>
                                    <th className=''>Fecha</th>
                                    <th className=''></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {comments
                                        .sort((a, b) => { return new Date(b.date).getTime() - new Date(a.date).getTime(); })
                                        .map((comment, index) => (
                                            <tr key={comment.id}>
                                                <td className='fw-bold'>{index + 1}</td>
                                                <td className="text-start"><Link to={`/theme/${comment.theme.id}`} className={`${styles.theme_link} text-dark`}>{comment.content.slice(3, -4)}</Link></td>
                                                <td>{comment.user?.username}</td>
                                                <td>{new Date(comment.date).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}</td>
                                                <td className={`text-end text-nowrap ${styles.cursor_pointer}`}>
                                                    <span className="material-symbols-outlined pe-2">
                                                        edit
                                                    </span>
                                                    <span className="material-symbols-outlined" data-bs-toggle="modal" data-bs-target={`#modalComment${comment.id}`}>
                                                        delete
                                                    </span>

                                                    <div className="modal fade" id={`modalComment${comment.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">¿Desea eliminar la categoría?</h1>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body text-start">
                                                                    <p className='fs-5 fw-bold'>Categoía:</p>
                                                                    <p className='text-wrap'>{comment.content.slice(3, -4)}</p>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                    <button onClick={() => deleteComment(comment.id)} type="button" className="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade show" id="pills-users" role="tabpanel" aria-labelledby="pills-users-tab" tabIndex={0}>
                    <div className="col-12">
                        <h2 className="mt-5 mb-3">Usuarios</h2>
                        <div className='table-responsive'>
                            <table className={`table ${styles.table}`}>
                                <thead className='fs-5 table-dark'>                                    <tr>
                                    <th className=''>#</th>
                                    <th className=''>Imagen</th>
                                    <th className=''>Nombre</th>
                                    <th className=''>Usuario</th>
                                    <th className=''>Fecha de nacimiento</th>
                                    <th className=''>Rol</th>
                                    <th className=''></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {users
                                        .map((user, index) => (
                                            <tr key={user.id}  >
                                                <td className='fw-bold'>{index + 1}</td>
                                                <td className='fw-bold'><img src={user.image} /></td>
                                                <td className={`text-start ${user.active === false ? `text-secondary` : ""}`}>{user.name} {user.lastname}</td>
                                                <td className={`text-start ${user.active === false ? `text-secondary` : ""}`}>{user.username ? user.username : ""}</td>
                                                <td  className={`text-start ${user.active === false ? `text-secondary` : ""}`}>{user.birthdate ? new Date(user.birthdate).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                }) : "Indefinida"}</td>
                                                <td  className={`text-start ${user.active === false ? `text-secondary` : ""}`}>{user.role}</td>
                                                <td className={`text-end text-nowrap ${styles.cursor_pointer}`}>
                                                    <span className="material-symbols-outlined pe-2">
                                                        edit
                                                    </span>
                                                    {user.active === true ?
                                                        <>
                                                            <span className="material-symbols-outlined pe-2" data-bs-toggle="modal" data-bs-target={`#banUser${user.id}`}>
                                                                person_check
                                                            </span>

                                                            <div className="modal fade" id={`banUser${user.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">¿Desea banear a este usuario?</h1>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body text-start">
                                                                            <p className='fs-5 fw-bold mb-3'>El siguiente usuario quedará baneado:</p>
                                                                            <p className='text-wrap'>{user.username}</p>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                            <button onClick={() => deactiveUser(user.id)} type="button" className="btn btn-warning" data-bs-dismiss="modal">Banear</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>

                                                        :
                                                        <>
                                                            <span className="material-symbols-outlined pe-2" data-bs-toggle="modal" data-bs-target={`#banUser${user.id}`}>
                                                                person_off
                                                            </span>

                                                            <div className="modal fade" id={`banUser${user.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">¿Desea activar a este usuario?</h1>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body text-start">
                                                                            <p className='fs-5 fw-bold mb-3'>El siguiente usuario volvera a estar activo:</p>
                                                                            <p className='text-wrap'>{user.username}</p>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                            <button onClick={() => activeUser(user.id)} type="button" className="btn btn-success" data-bs-dismiss="modal">Activar</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>


                                                    }

                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade show" id="pills-category" role="tabpanel" aria-labelledby="pills-category-tab" tabIndex={0}>
                    <div className="col-12">
                        <div className='d-flex gap-4 align-items-baseline mt-5 mb-3'>
                            <h2 className="">Categorías</h2>
                            <button className={`btn ${styles.bg_blue} text-light py-1`} data-bs-toggle="modal" data-bs-target="#createCategory">Crear</button>

                            <div className="modal fade" id="createCategory" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Crear categoría</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <input placeholder='Nombre de la categoría' className='form-control' type='text' value={categoryName} onChange={(e) => actions.setCategoryName(e.target.value)} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                            <button onClick={addCategory} type="button" className={`btn ${styles.btn_admin}`} data-bs-dismiss="modal">Crear</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className='table-responsive'>
                            <table className={`table ${styles.table}`}>
                                <thead className='fs-5 table-dark'>
                                    <tr>
                                        <th className=''>#</th>
                                        <th className=''>Nombre</th>
                                        <th className=''></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories
                                        .map((category, index) => (
                                            <tr key={category.id}>
                                                <td className='fw-bold'>{index + 1}</td>
                                                <td className="text-start">{category.name}</td>
                                                <td className={`text-end text-nowrap ${styles.cursor_pointer}`}>
                                                    <span className="material-symbols-outlined pe-2">
                                                        edit
                                                    </span>
                                                    <span className="material-symbols-outlined" data-bs-toggle="modal" data-bs-target={`#modalCategory${category.id}`}>
                                                        delete
                                                    </span>

                                                    <div className="modal fade" id={`modalCategory${category.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">¿Desea eliminar la categoría?</h1>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body text-start">
                                                                    <p className='fs-5 fw-bold'>Categoía:</p>
                                                                    <p className='text-wrap'>{category.name}</p>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                    <button onClick={() => deleteCategory(category.id)} type="button" className="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
