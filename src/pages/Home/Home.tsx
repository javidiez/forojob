import { CategoryBlockHome } from "../../components/CategoryBlockHome/CategoryBlockHome"
import { HotThemesHome } from "../../components/HotThemesHome/HotThemesHome"
import styles from "./home.module.css"


export const Home = () => {

    return (
        <>
            <HotThemesHome />

            <div className="container mt-5">
                <div className={`${styles.bg_section} text-light container p-2`}>
                    <h2>Empleo</h2>
                </div>
                <CategoryBlockHome title={"Ofertas de trabajo"} subCategories={""} />
                <CategoryBlockHome title={"Empresas"} subCategories={""} />
                <CategoryBlockHome title={"Reclutadores"} subCategories={""} />
                <CategoryBlockHome title={"Tips y consejos"} subCategories={""} />
            </div>

            <div className="container mt-5">
                <div className={`${styles.bg_section} text-light container p-2`}>
                    <h2>Curriculum Vitae</h2>
                </div>
                <CategoryBlockHome title={"Consejos y sugerencias"} subCategories={""} />
                <CategoryBlockHome title={"Plataformas para crear"} subCategories={""} />
                <CategoryBlockHome title={"Dudas y consultas"} subCategories={""} />
            </div>

            <div className="container mt-5">
                <div className={`${styles.bg_section} text-light container p-2`}>
                    <h2>Recursos</h2>
                </div>
                <CategoryBlockHome title={"Herramientas"} subCategories={"Cursos online"} />
                <CategoryBlockHome title={"Tutoriales"} subCategories={"Cursos online"} />
                <CategoryBlockHome title={"Cursos gratuitos"} subCategories={"Cursos online"} />
                <CategoryBlockHome title={"Cursos pagos"} subCategories={""} />
            </div>

            <div className="container mt-5">
                <div className={`${styles.bg_section} text-light container p-2`}>
                    <h2>Redes sociales</h2>
                </div>
                <CategoryBlockHome title={"LinkedIn"} subCategories={""} />
                <CategoryBlockHome title={"Github"} subCategories={""} />
            </div>

            <div className="container mt-5 pb-5">
                <div className={`${styles.bg_section} text-light container p-2`}>
                    <h2>Comunidad</h2>
                </div>
                <CategoryBlockHome title={"Fuera de tema"} subCategories={""} />
            </div>
        </>
    )
}
