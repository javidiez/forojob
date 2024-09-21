import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAppContext from "../../store/AppContext";
import avatar from "../../../assets/img/avatar.png";
import styles from "./comments.module.css";

interface CommentsProps {
    avatar: string;
    signupDate: Date;
    commentDate: Date;
    username: string
    edit: React.ReactNode;
    content: string
    userMessages: React.ReactNode;
}


export const Comments = (props: CommentsProps) => {



    return (
        <div className="mb-2">
            <div className="bg-light p-3 d-flex flex-column rounded" style={{ height: '100%' }}>
                <div className="row flex-grow-1">
                    <div className="col-12 col-sm-2 text-center border-end">
                        <img className={`${styles.avatar} img-fluid`} src={props.avatar} alt="Avatar" />
                        <p className="fw-bold text-center fs-5 mt-2 mb-3">{props.username}</p>
                        <p>Desde: <span className="text-secondary">{new Date(props.signupDate).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}</span></p>
                        <p>{props.userMessages} </p>
                    </div>
                    <div className="col-12 col-sm-10 d-flex flex-column">
                        <div>
                            <div className="d-flex justify-content-between">
                                <p className="text-secondary">{new Date(props.commentDate).toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</p>
                                {props.edit}
                            </div>
                            <hr />
                            <p dangerouslySetInnerHTML={{ __html: props.content.slice(3, -4) }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
