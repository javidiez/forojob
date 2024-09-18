import styles from "./hotThemesHome.module.css"

export const HotThemesHome = () => {

    return (
        <div className="container mt-4">
            <div className="row justify-content-center container">
                <div className="row col-12 col-sm-6">
                    <div className={`col-12 bg-dark text-light ${styles.rounded_top_left}`}>
                        <div className="d-flex align-items-center">
                            <span className="material-symbols-outlined fs-3">
                                timer
                            </span>
                            <h2 className="p-2">Temas recientes</h2>
                        </div>
                    </div>
                    <div className={`col-12 bg-light ${styles.rounded_bottom_left} border-end`}>
                        <div>
                            <p className="p-2">Temas recientes</p>
                            <p className="p-2">Temas recientes</p>
                            <p className="p-2">Temas recientes</p>
                            <p className="p-2">Temas recientes</p>
                        </div>
                    </div>
                </div>
                <div className="row col-12 col-sm-6">
                    <div className={`col-12 bg-dark text-light ${styles.rounded_top_right}`}>
                        <div className="d-flex align-items-center gap-1">
                            <span className="material-symbols-outlined fs-3">
                                local_fire_department
                            </span>
                            <h2 className="p-2">Temas populares</h2>
                        </div>
                    </div>
                    <div className={`col-12 bg-light ${styles.rounded_bottom_right}`}>
                        <div>
                            <p className="p-2">Temas recientes</p>
                            <p className="p-2">Temas recientes</p>
                            <p className="p-2">Temas recientes</p>
                            <p className="p-2">Temas recientes</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
