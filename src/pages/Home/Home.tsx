import { CategoryBlockHome } from "../../components/CategoryBlockHome/CategoryBlockHome"
import { HotThemesHome } from "../../components/HotThemesHome/HotThemesHome"
import { UsefulButtons } from "../../components/UsefulButtons/UsefulButtons"
import styles from "./home.module.css"
import { useEffect } from "react"
import useAppContext from "../../store/AppContext"
import { useNavigate } from "react-router-dom"


export const Home = () => {


    const { actions, store } = useAppContext();
    const { categories } = store
    const navigate = useNavigate();

    useEffect(() => {
        actions.getComments();
        actions.getThemes();
        actions.getCategories();
    }, [])

    const themesCategory = (categoryId: number) => {
        navigate(`/category-themes/${categoryId}`)
    }

    return (
        <>
            <UsefulButtons />
            <HotThemesHome />

            <div className="container mt-4">
                <CategoryBlockHome title={<div className="d-flex align-items-center gap-2"><span className="material-symbols-outlined">
                    work
                </span><p>Empleo</p></div>} category={categories
                    .filter(category => category.head == "Empleo")
                    .map(category =>
                        <tr>
                            <td className={`${styles.theme_link} text-dark fs-5`} colSpan={4} onClick={() => themesCategory(category.id)}>{category.name}</td>
                        </tr>
                    )}
                    subCategories={""} />

                <CategoryBlockHome title={<div className="d-flex align-items-center gap-2"><span className="material-symbols-outlined">
                    description
                </span><p>Curriculm Vitae</p></div>} category={categories
                    .filter(category => category.head == "Curriculum Vitae")
                    .map(category =>
                        <tr>
                            <td className={`${styles.theme_link} text-dark fs-5`} colSpan={4} onClick={() => themesCategory(category.id)}>{category.name}</td>
                        </tr>
                    )}
                    subCategories={""} />

                <CategoryBlockHome title={<div className="d-flex align-items-center gap-2"><span className="material-symbols-outlined">
                    school
                </span><p>Capacitación</p></div>} category={categories
                    .filter(category => category.head == "Capacitación")
                    .map(category =>
                        <tr>
                            <td className={`${styles.theme_link} text-dark fs-5`} colSpan={4} onClick={() => themesCategory(category.id)}>{category.name}</td>
                        </tr>
                    )}
                    subCategories={""} />

                <CategoryBlockHome title={<div className="d-flex align-items-center gap-2"><span className="material-symbols-outlined">
                    forum
                </span><p>Comunidad</p></div>} category={categories
                    .filter(category => category.head == "Comunidad")
                    .map(category =>
                        <tr>
                            <td className={`${styles.theme_link} text-dark fs-5`} colSpan={4} onClick={() => themesCategory(category.id)}>{category.name}</td>
                        </tr>
                    )}
                    subCategories={""} />

            </div>
        </>
    )
}
