import { UsefulButtons } from "../../components/UsefulButtons/UsefulButtons"
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import useAppContext from "../../store/AppContext";
import styles from "./categoryThemes.module.css"

export const CategoryThemes = () => {

    const { id } = useParams();
    const { actions, store } = useAppContext();
    const { themes, categories } = store;

    useEffect(() => {
        actions.getThemes();
        actions.getComments();
        actions.getLikes();
        actions.getCategories();
    }, []);

    const categoryThemes = themes
        .filter(theme => theme.category.id == id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    return (
        <>
            <UsefulButtons />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <table className={`table table-borderles ${styles.table}`}>
                            <thead>
                                <tr>
                                    <th className={`${styles.bg_blue} text-light d-flex align-items-center gap-2`}>
                                        <span className="material-symbols-outlined fs-3">
                                            3p
                                        </span>
                                        {categories
                                            .filter(category => category.id == id)
                                            .map(category => (
                                                <h2 className="">
                                                    {category.name} ({category.head})
                                                </h2>
                                            ))}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryThemes.length > 0 ? (
                                    categoryThemes.map(theme => (
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
                                        <td>No hay temas de creados para esta categoría</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
