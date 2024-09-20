import MyEditor from "../ReactQuill/ReactQuill"
import styles from "./createTheme.module.css";
import { Link, useNavigate } from "react-router-dom"
import useAppContext from "../../store/AppContext"
import { useEffect } from "react";



export const CreateTheme = () => {

    const { actions, store } = useAppContext();
    const { themeTitle, categories, themeContent } = store
    const navigate = useNavigate();

    useEffect(() => {
        actions.getCategories();
    }, [])



    const addTheme = () => {
        const cleanedContent = themeContent.replace(/<(.|\n)*?>/g, '').trim();
        if (cleanedContent.length > 0) {
            actions.addTheme();
        } else {
            console.error('El contenido está vacío o no contiene texto significativo.');
            alert('El contenido no puede estar vacío.'); // También podrías usar un mensaje de error visible en la interfaz.
        }
    }

    return (
        <div className="container">
            <div className="bg-light p-3 rounded">
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="exampleInputEmail1" className="form-label fs-4">Título</label>
                        <input type="text" className="form-control form-control-lg" placeholder="Título del tema" aria-label="Título" value={themeTitle} onChange={(e) => actions.setThemeTitle(e.target.value)} />
                    </div>
                    <div className="col-12 mt-4">
                        <MyEditor />
                        <div className="d-flex mt-4 justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                                <p className="text-nowrap">Seleccione una Categoría</p>
                                <select
                                    onChange={(e) => {
                                        const selectedCategoryId = Number(e.target.value); // Convierte el ID a número directamente
                                        actions.setSelectedCategory(selectedCategoryId); // Asegúrate de que sea un número o undefined
                                    }} className="form-select"
                                    aria-label="Default select example"
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="d-flex gap-3">
                                <button onClick={addTheme} className={`btn ${styles.btn_orange}`} type="button">Publicar tema</button>
                                <button className={`btn ${styles.bg_orange}`} type="button">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
