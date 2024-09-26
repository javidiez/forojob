import styles from "./categoryBlockHome.module.css"

interface CategoryBlockHomeProps {
    title: React.ReactNode;
    category: React.ReactNode;
    subCategories: string
}

export const CategoryBlockHome = (props: CategoryBlockHomeProps) => {

    return (
        <table className={`table table-borderles ${styles.table}`}>
            <thead>
                <tr>
                    <th colSpan={4} className={`${styles.bg_blue} text-light`}>
                    <h2>{props.title}</h2>
                    </th>

                </tr>
            </thead>
            <tbody>
                {props.category}
            </tbody>
        </table>
    )
}
