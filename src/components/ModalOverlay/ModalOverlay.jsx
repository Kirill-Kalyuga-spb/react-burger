import React from "react";
import Modal from "../Modal/Modal";
import stylesModalOverlay from './ModalOverlay.module.css'
import { createPortal } from 'react-dom';

export default function ModalOverlay(props) {

    const overlayClose = (e) => {
        if (e.target.classList.contains(`${stylesModalOverlay.overlay}`)) {
            props.exit()
        }
    }
    
    return createPortal(
        <div className={stylesModalOverlay.overlay} onClick={overlayClose}>
            <Modal children={props.children} exit={props.exit} />
        </div>,
        document.getElementById("react-modals")
    )
}