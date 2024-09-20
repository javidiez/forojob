import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAppContext from "../../../store/AppContext";
import avatar from "../../../assets/img/avatar.png";
import styles from "./theme.module.css";
import CommentBox from "../../../components/CommentBox/CommentBox";
import { Comments } from "../../../components/Comments/Comments";

export const Theme = () => {
    const { id } = useParams();
    const { actions, store } = useAppContext();
    const { themes, userId, comments, commentContent } = store;
    const navigate = useNavigate();

    useEffect(() => {
        actions.getThemes();
        actions.getComments();
    }, []);

    const addComment = (themeId: number) => {
        const cleanedContent = commentContent.replace(/<(.|\n)*?>/g, '').trim();
        if (cleanedContent.length > 0) {
            actions.addComment(themeId);
        } else {
            console.error('El comentario está vacío o no contiene texto significativo.');
            alert('El comentario no puede estar vacío.'); // También podrías usar un mensaje de error visible en la interfaz.
        }
    }

    const themeId = Number(id); // Convierte el id a número

    return (
        <>
            {themes
                .filter(theme => theme.id === themeId)
                .map(theme => (
                    <div className="container" key={theme.id}>
                        <div className="bg-light p-3 rounded d-flex flex-column" style={{ height: '100%' }}>
                            <div className="row flex-grow-1">
                                <div className="col-12 col-sm-2 text-center">
                                    <img className={styles.avatar} src={theme.user.image ? theme.user.image : avatar} alt="Avatar" />
                                    <p className="fw-bold text-center fs-5 mt-2 mb-3">{theme.user.username}</p>
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
                                        <div className="d-flex justify-content-between">
                                            <p className="text-secondary">{new Date(theme.date).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}</p>
                                            {theme.user.id == userId ? (
                                                <span className="material-symbols-outlined">
                                                    edit
                                                </span>
                                            ) : ""}
                                        </div>
                                        <hr />
                                        <h2 className="mb-3">{theme.title}</h2>
                                        <p>{theme.content.slice(3, -4)}</p>
                                    </div>
                                    <div className="mt-auto text-start"> {/* mt-auto empuja este div a la parte inferior */}
                                        <p className="mt-5">Categoría: <span className="text-secondary">{theme.category.name}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light rounded my-4 p-3">
                            <h3 className="mb-3">Comentarios</h3>
                            <CommentBox />
                            <button onClick={() => addComment(theme.id)} className={`btn ${styles.btn_orange} mt-3`}>Comentar</button>
                        </div>
                        {comments
                            .filter(comment => comment.theme.id == theme.id)
                            .map(comment => (
                                <Comments avatar={comment.user.image ? theme.user.image : avatar} username={comment.user.username} signupDate={comment.user.date} userMessages={<p>Mensajes: <span className="text-secondary">{comments
                                    .filter(comment => comment.user.id == theme.user.id).length
                                }</span></p>} content={comment.content} commentDate={comment.date} edit={comment.user.id == userId ? (
                                    <span className="material-symbols-outlined">
                                        edit
                                    </span>
                                ) : ""} />
                            ))

                        }
                    </div>
                ))}
        </>
    );
};
