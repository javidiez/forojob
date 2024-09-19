import { CategoryBlockHome } from "../../components/CategoryBlockHome/CategoryBlockHome"
import { HotThemesHome } from "../../components/HotThemesHome/HotThemesHome"
import styles from "./home.module.css"


export const Home = () => {

    return (
        <>
            <HotThemesHome />

            <div className="container mt-5">
                <CategoryBlockHome title={"Empleo"} category={''} subCategories={""} />

            </div>
        </>
    )
}
