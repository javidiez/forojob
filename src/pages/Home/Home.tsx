import { CategoryBlockHome } from "../../components/CategoryBlockHome/CategoryBlockHome"
import { HotThemesHome } from "../../components/HotThemesHome/HotThemesHome"
import { UsefulButtons } from "../../components/UsefulButtons/UsefulButtons"
import styles from "./home.module.css"


export const Home = () => {

    return (
        <>
            <UsefulButtons />
            <HotThemesHome />

            <div className="container mt-5">
                <CategoryBlockHome title={"Empleo"} category={''} subCategories={""} />

            </div>
        </>
    )
}
