
import styles from "./themeFavorite.module.css"
import useAppContext from "../../store/AppContext"
import { useEffect } from "react";
import { Link } from "react-router-dom";


export const ThemeFavorite = () => {

    const { actions, store } = useAppContext();
    const { themes, userId, likes } = store

    useEffect(() => {
        actions.getThemes();
        actions.getLikes();
    }, [])


    const favoriteThemes =
    themes
        .filter(theme => theme.active && 
            likes.some(like => like.theme.id === theme.id && like.user.id == userId))  // Verificamos si el usuario ha dado like a este tema
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <table className={`table table-borderles ${styles.table}`}>
                        <thead>
                            <tr>
                                <th className={`${styles.bg_blue} text-light d-flex align-items-center gap-2`}>
                                    <span className="material-symbols-outlined fs-3">
                                        thumb_up
                                    </span>
                                    <h2 className="">Temas favoritos</h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {favoriteThemes.length > 0 ? (
                                favoriteThemes.map(theme => (
                                    <tr key={theme.id}>
                                        <td colSpan={4}>
                                            <Link to={`/theme/${theme.id}`} className={`${styles.theme_link} text-dark ps-1`}>
                                                {theme.title}
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>No tienes ningún tema guardado en favoritos</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
