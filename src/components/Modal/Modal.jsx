import {
    CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect } from "react";
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styleModal from './Modal.module.css';

export default function Modal(props) {
    const escClose = (evt) => {if (evt.key === "Escape") {props.exit()}}

    useEffect(() => {
    document.addEventListener("keydown", escClose)

    return () => document.removeEventListener("keydown", escClose);
  }, [props.exit]);
    
    return createPortal(
        <>
        <ModalOverlay exit={props.exit} />
        <div className={styleModal.container}>
            <span className={`${styleModal.closeIcon} mt-15 mr-10`}  onClick={props.exit} ><CloseIcon type="primary" /></span>
            <div className={styleModal.div}>{props.children}</div>
        </div>
        </>,
        document.getElementById("react-modals")
    )
}