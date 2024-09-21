import MyEditor from "../ReactQuill/ReactQuill"
import styles from "./createTheme.module.css";
import { Link, useNavigate } from "react-router-dom"
import useAppContext from "../../store/AppContext"
import { useEffect, useState } from "react";



export const CreateTheme = () => {

    const { actions, store } = useAppContext();
    const { themeTitle, categories, themeContent, token, selectedCategory } = store
    const navigate = useNavigate();
    const [categoryError, setCategoryError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [titleError, setTitleError] = useState(false);


    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token])

    useEffect(() => {
        actions.getCategories();
    }, [])



    const addTheme = () => {
        const cleanedContent = themeContent.replace(/<(.|\n)*?>/g, '').trim();
        if (cleanedContent.length > 0 && selectedCategory) {
            setCategoryError(false);
            setContentError(false);
            setTitleError(false);
            actions.addTheme();
            actions.setThemeTitle('');
            actions.setThemeContent('');
        } else {
            // Si el contenido o la categoría están vacíos
            if (cleanedContent.length === 0) {
                setContentError(true);  // Muestra una alerta si el contenido está vacío
            }
            if (!selectedCategory) {
                setCategoryError(true);  // Marca el campo de la categoría con error si no se seleccionó ninguna
            }
            if (!themeTitle) {
                setTitleError(true);
            }
        }
    };

    return (
        <div className="container">
            <div className="bg-light p-3 rounded">
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="exampleInputEmail1" className="form-label fs-4">Título</label>
                        {titleError && (
                            <div className="error-message text-danger mt-2 text-nowrap">
                                Por favor, complete el título.
                            </div>
                        )}
                        <input type="text" className="form-control form-control-lg" placeholder="Título del tema" aria-label="Título" value={themeTitle} onChange={(e) => actions.setThemeTitle(e.target.value)} />
                    </div>
                    <div className="col-12 mt-4">
                        {contentError && (
                            <div className="error-message text-danger mt-2 text-nowrap">
                                Por favor, escriba algo.
                            </div>
                        )}
                        <MyEditor />
                        <div className="d-flex mt-4 justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                                <p className="text-nowrap">Seleccione una Categoría</p>
                                <select
                                    onChange={(e) => {
                                        const selectedCategoryId = Number(e.target.value); // Convierte el ID a número directamente
                                        actions.setSelectedCategory(selectedCategoryId); // Asegúrate de que sea un número o undefined
                                    }} className={`form-select ${categoryError ? `${styles.is_invalid}` : ''}`}
                                    aria-label="Default select example" required
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {categoryError && (
                                    <div className="error-message text-danger mt-2 text-nowrap">
                                        Por favor, selecciona una categoría.
                                    </div>
                                )}


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
