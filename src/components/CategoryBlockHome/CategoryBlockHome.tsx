import styles from "./categoryBlockHome.module.css"

interface CategoryBlockHomeProps {
    title: string;
    subCategories: string
}

export const CategoryBlockHome = (props:CategoryBlockHomeProps) => {

    return (
        <div className={`bg-light p-2 ${styles.rounded}`}>
            <h4>{props.title}</h4>
            <p>{props.subCategories}</p>
        </div>
    )
}
