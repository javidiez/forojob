import styles from "./hotThemesHome.module.css"

export const HotThemesHome = () => {

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
                            <tr>
                                <th className="" colSpan={4}>Ofertas de trabajo</th>
                            </tr>
                            <tr>
                                <th className="" colSpan={4}>Ofertas de trabajo</th>
                            </tr>
                            <tr>
                                <th className="" colSpan={4}>Ofertas de trabajo</th>
                            </tr>
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
                            <tr>
                                <th className="" colSpan={4}>Ofertas de trabajo</th>
                            </tr>
                            <tr>
                                <th className="" colSpan={4}>Ofertas de trabajo</th>
                            </tr>
                            <tr>
                                <th className="" colSpan={4}>Ofertas de trabajo</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
