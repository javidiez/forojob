import styles from "./hotThemesHome.module.css"
import useAppContext from "../../store/AppContext"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const HotThemesHome = () => {


    const { actions, store } = useAppContext();
    const { themes } = store

    useEffect(() => {
        actions.getThemes();
    }, [])


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12 col-sm-6">
                    <table className={`table table-borderles ${styles.table}`}>
                        <thead>
                            <tr>
                                <th colSpan={4} className={`${styles.bg_blue} text-light d-flex align-items-center gap-2`}>
                                    <span className="material-symbols-outlined fs-3">
                                        timer
                                    </span>
                                    <h2 className="">Temas recientes</h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {themes
                                .filter(theme => theme.active)
                                .sort((a, b) => { return new Date(b.date).getTime() - new Date(a.date).getTime(); })
                                .slice(0, 10)
                                .map(theme => (
                                    <tr key={theme.id}>
                                        
                                        <td colSpan={4} className="d-flex">
                                        {theme.category.head === "Empleo" ? <span className="material-symbols-outlined">
                                                work
                                            </span>
                                                :
                                                theme.category.head === "Curriculum Vitae" ?
                                                    <span className="material-symbols-outlined">
                                                        description
                                                    </span>
                                                    :
                                                    theme.category.head === "Capacitación" ?
                                                        <span className="material-symbols-outlined">
                                                            school
                                                        </span>
                                                        :
                                                        <span className="material-symbols-outlined">
                                                            forum
                                                        </span>
                                            }
                                            <Link to={`/theme/${theme.id}`} className={`${styles.theme_link} text-dark ps-1`}>{theme.title}</Link></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-12 col-sm-6">
                    <table className={`table table-borderles ${styles.table}`}>
                        <thead>
                            <tr>
                                <th colSpan={4} className={`${styles.bg_blue} text-light d-flex align-items-center gap-2`}>
                                    <span className="material-symbols-outlined fs-3">
                                        local_fire_department
                                    </span>
                                    <h2 >Temas populares</h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {themes
                                .filter(theme => theme.comments && Array.isArray(theme.comments) && theme.comments.length > 1 && theme.active)
                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                .slice(0, 10)
                                .map((theme) => (
                                    <tr key={theme.id}>
                                        <td colSpan={4} className="d-flex">
                                            {theme.category.head === "Empleo" ? <span className="material-symbols-outlined">
                                                work
                                            </span>
                                                :
                                                theme.category.head === "Curriculum Vitae" ?
                                                    <span className="material-symbols-outlined">
                                                        description
                                                    </span>
                                                    :
                                                    theme.category.head === "Capacitación" ?
                                                        <span className="material-symbols-outlined">
                                                            school
                                                        </span>
                                                        :
                                                        <span className="material-symbols-outlined">
                                                            forum
                                                        </span>
                                            }

                                            <Link to={`/theme/${theme.id}`} className={`${styles.theme_link} text-dark ps-1`}>{theme.title}</Link></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
