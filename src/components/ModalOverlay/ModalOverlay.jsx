import React from "react";
import Modal from "../Modal/Modal";
import stylesModalOverlay from './ModalOverlay.module.css'

export default function ModalOverlay(props) {

    const overlayClose = (e) => {
        if (e.target.classList.contains(`${stylesModalOverlay.overlay}`)) {
            props.exit()
        }
    }
    
    return (
        <div className={stylesModalOverlay.overlay} onClick={overlayClose}></div>
    )
}