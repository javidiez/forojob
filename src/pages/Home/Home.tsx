import { CategoryBlockHome } from "../../components/CategoryBlockHome/CategoryBlockHome"
import { HotThemesHome } from "../../components/HotThemesHome/HotThemesHome"
import { UsefulButtons } from "../../components/UsefulButtons/UsefulButtons"
import styles from "./home.module.css"
import { useEffect } from "react"
import useAppContext from "../../store/AppContext"


export const Home = () => {

    const { actions } = useAppContext();

    useEffect(() => {
        actions.getComments();
        actions.getThemes();
 
    }, [])

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
