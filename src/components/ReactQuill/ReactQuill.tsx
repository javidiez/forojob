import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importar estilos predeterminados
import styles from './reactQuill.module.css'
import useAppContext from "../../store/AppContext"

const MyEditor = () => {
    const { actions, store } = useAppContext();
    const { themeContent } = store

    const setThemeContent = (content: string) => {
        actions.setThemeContent(content); // Asegúrate de que esta acción esté definida en tu contexto
    };


    //   return <ReactQuill theme="snow" value={value} onChange={setValue} className={styles.react_quill}/>;

    return (
        <div style={{ height: '20rem', paddingBottom: "2.5rem", backgroundColor: "white" }}>
            <ReactQuill
                value={themeContent}
                onChange={setThemeContent}
                style={{ height: '100%', backgroundColor: "white" }} // Ajustar la altura del editor
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        ['link'],
                        ['clean']
                    ]
                }}
            />
        </div>
    )
};

export default MyEditor;
