import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAppContext from "../../store/AppContext";
import avatar from "../../assets/img/avatar.png"
import styles from "./theme.module.css";
import CommentBox from "../../components/CommentBox/CommentBox";
import { Comments } from "../../components/Comments/Comments";
import { UsefulButtons } from "../../components/UsefulButtons/UsefulButtons";

export const Theme = () => {
    const { id } = useParams();
    const { actions, store } = useAppContext();
    const { themes, userId, comments, commentContent, likes, token, themeTitle, themeContent, themeCategory } = store;

    useEffect(() => {
        actions.getThemes();
        actions.getComments();
        actions.getLikes();
    }, []);

    const addComment = (themeId: number) => {
        const cleanedContent = commentContent.replace(/<(.|\n)*?>/g, '').trim();
        if (cleanedContent.length > 0) {
            actions.addComment(themeId);
        } else {
            alert('El comentario no puede estar vacío.');
        }
    }

    const themeId = Number(id); // Convierte el id a número


    const addLike = async (theme_id: number) => {
        await actions.addLike(theme_id);
        const updatedFavData = await actions.getLikes();
        const isFavorited = Array.isArray(updatedFavData) && updatedFavData.some(fav => fav.theme.id == themeId && userId == fav.user.id);
    };
    //Elimina un favorito de la lista
    const deleteLike = async (favId: number) => {
        await actions.deleteLike(favId);
        const updatedFavData = await actions.getLikes();
        const isFavorited = Array.isArray(updatedFavData) && updatedFavData.some(fav => fav.theme.id == themeId && userId == fav.user.id);
    };
    const isFavorited = Array.isArray(likes) && likes.some(fav => fav.theme.id == themeId && userId == fav.user.id);

    const editTheme = (id: number, title: string, content: string, category: string) => {
        actions.editTheme(id, title, content, category);
    }

    const openEditModal = (theme:any) => {
        actions.setThemeTitle(theme.title);
        actions.setThemeContent(theme.content.slice(3, -4));
        actions.setThemeCategory(theme.category.name);
    };


    return (
        <>
            <UsefulButtons />
            {themes
                .filter(theme => theme.id === themeId)
                .map(theme => (
                    <div className="container mt-4" key={theme.id}>
                        <div className="bg-light p-3 rounded d-flex flex-column" style={{ height: '100%' }}>
                            <div className="row flex-grow-1">
                                <div className="col-12 col-sm-2 text-center border-end">
                                    <img className={`${styles.avatar} img-fluid`} src={theme.user.image ? theme.user.image : avatar} alt="Avatar" />
                                    <p className="fw-bold text-center fs-5 mt-2">{theme.user.username}</p>
                                    {theme.user.role === "admin" ?
                                        <span className={`badge rounded-pill ${styles.bg_blue} mb-4`}>Administrador</span>
                                        :
                                        theme.user.role === "moderator" ?
                                            <span className={`badge rounded-pill ${styles.btn_orange} mb-4`}>Moderador</span>
                                            :
                                            <span className={`badge rounded-pill bg-dark mb-4`}>Usuario</span>
                                    }
                                    <p>Desde: <span className="text-secondary">{new Date(theme.user.signup_date).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}</span></p>
                                    <p>Mensajes: <span className="text-secondary">{comments
                                        .filter(comment => comment.user.id == theme.user.id).length
                                    }</span></p>
                                </div>
                                <div className="col-12 col-sm-10 d-flex flex-column">
                                    <div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <p className={`text-secondary ${styles.date}`}>{new Date(theme.date).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}</p>
                                            {theme.user.id == userId ? (
                                                <>
                                                    <span className="material-symbols-outlined" data-bs-toggle="modal" data-bs-target={`#modalEditTheme${theme.id}`} onClick={() => openEditModal(theme)}>
                                                        edit
                                                    </span>

                                                    <div className="modal fade" id={`modalEditTheme${theme.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog modal-lg">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Categoría</h1>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body text-start d-flex flex-column gap-3">
                                                                    <label className="fw-bold">Título</label>
                                                                    <input type="text" className='form-control' value={themeTitle} onChange={(e) => actions.setThemeTitle(e.target.value)} />
                                                                    <label className="fw-bold">Contenido</label>
                                                                    <textarea rows={15} className='form-control' value={themeContent} onChange={(e) => actions.setThemeContent(e.target.value)} />
                                                                    <label className="fw-bold">Categoría</label>
                                                                    <input type="text" className='form-control' value={themeCategory} onChange={(e) => actions.setThemeCategory(e.target.value)} />
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                    <button onClick={() => editTheme(theme.id,themeTitle,themeContent,themeCategory )} type="button" className={`btn ${styles.bg_blue} text-light`} data-bs-dismiss="modal">Editar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>


                                            ) : ""}
                                        </div>
                                        <hr />
                                        <h2 className="mb-3 mt-3">{theme.title}</h2>
                                        <p dangerouslySetInnerHTML={{ __html: theme.content.slice(3, -4) }}></p>
                                    </div>
                                    <div className="mt-auto d-flex justify-content-between">
                                        <div className="text-start">
                                            <p className="mt-4">Categoría: <span className="text-secondary">{theme.category.name}</span></p>
                                        </div>
                                        <div className={styles.like_blue}>
                                            {(
                                                isFavorited ? (
                                                    <div className="d-flex gap-2 fs-5" onClick={() => {
                                                        const favId = likes.find(fav => fav.theme.id === themeId && fav.user.id == userId);
                                                        if (favId) deleteLike(favId.id);
                                                    }}>
                                                        <p>Ya no me gusta</p>
                                                        <span
                                                            className="bi bi-hand-thumbs-up-fill"
                                                        ></span>
                                                        {likes
                                                            .filter(like => like.theme.id === themeId).length
                                                        }
                                                    </div>
                                                ) : (
                                                    <div className="d-flex gap-2 fs-5" onClick={() => addLike(theme.id)}>
                                                        <p>Me gusta</p>
                                                        <span
                                                            className="bi bi-hand-thumbs-up"
                                                        ></span>
                                                        {likes
                                                            .filter(like => like.theme.id === themeId).length
                                                        }
                                                    </div>
                                                )
                                            )}



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {token ? <div className="bg-light rounded my-4 p-3">
                            <h3 className="mb-3">Comentarios</h3>
                            <CommentBox />
                            <button onClick={() => addComment(theme.id)} className={`btn ${styles.btn_orange} mt-3`}>Comentar</button>
                        </div> : ""}

                        {comments
                            .filter(comment => comment.theme.id === theme.id)
                            .map(comment => {
                                // Contar el número de comentarios del usuario actual
                                const userCommentCount = comments
                                    .filter(c => c.user.id == comment.user.id).length;

                                return (
                                    <Comments
                                        badge={comment.user.role === "admin" ?
                                            <span className={`badge rounded-pill ${styles.bg_blue} mb-4`}>Administrador</span>
                                            :
                                            comment.user.role === "moderator" ?
                                                <span className={`badge rounded-pill ${styles.btn_orange} mb-4`}>Moderador</span>
                                                :
                                                <span className={`badge rounded-pill bg-dark mb-4`}>Usuario</span>
                                        }
                                        avatar={comment.user.image ? comment.user.image : avatar}  // Usar el avatar del usuario del comentario
                                        username={comment.user.username}
                                        signupDate={comment.user.date}

                                        // Mostrar la cantidad de comentarios del usuario en este tema
                                        userMessages={<p>Mensajes: <span className="text-secondary">{userCommentCount}</span></p>}

                                        content={comment.content}
                                        commentDate={comment.date}

                                        // Mostrar el botón de editar si el usuario actual es el dueño del comentario
                                        edit={comment.user.id == userId ? (
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        ) : ""}
                                    />
                                );
                            })
                        }

                    </div>
                ))}
        </>
    );
};
