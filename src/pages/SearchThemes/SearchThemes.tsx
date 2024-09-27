import { UsefulButtons } from "../../components/UsefulButtons/UsefulButtons"
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import useAppContext from "../../store/AppContext"
import styles from './searchThemes.module.css'

export const SearchThemes = () => {

    const { actions, store } = useAppContext();
    const { themes } = store

    const location = useLocation();
    
    // Capturar el parámetro de búsqueda desde la URL
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || '';

    useEffect(() => {
        actions.getThemes();
    }, [])

    const filteredThemes = themes
    .filter(theme => theme.active === true && theme.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());  

    return (
        <>
            <UsefulButtons />
            <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <table className={`table table-borderles ${styles.table}`}>
                        <thead>
                            <tr>
                                <th className={`${styles.bg_blue} text-light d-flex align-items-center gap-2`}>
                                    <span className="material-symbols-outlined fs-3">
                                        search
                                    </span>
                                    <h2 className="">Temas relacionados con tu búsqueda</h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredThemes.length > 0 ? (
                                filteredThemes.map(theme => (
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
                                    <td>No hay temas que coincidan con tu búsqueda</td>
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
