import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importar estilos predeterminados
import styles from './reactQuill.module.css'
import useAppContext from "../../store/AppContext"

const CommentBox = () => {
    const { actions, store } = useAppContext();
    const { commentContent } = store

    const isValidComment = (content: string): boolean => {
        const cleanedContent = content.replace(/<(.|\n)*?>/g, '').trim(); // Elimina todas las etiquetas HTML y espacios en blanco
        return cleanedContent.length > 0;
    };

    const setCommentContent = (content: string) => {
        actions.setCommentContent(content); // Asegúrate de que esta acción esté definida en tu contexto
    };


    //   return <ReactQuill theme="snow" value={value} onChange={setValue} className={styles.react_quill}/>;

    return (
        <div style={{ height: '10rem', paddingBottom: "2.5rem", backgroundColor: "white" }}>
            <ReactQuill
                value={commentContent}
                onChange={setCommentContent}
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

export default CommentBox;
