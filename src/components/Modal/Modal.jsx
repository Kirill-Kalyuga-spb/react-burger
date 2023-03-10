import {
    CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import { createPortal } from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styleModal from './Modal.module.css';

export default function Modal(props) {

    return createPortal(
        <>
        <ModalOverlay exit={props.exit} />
        <div className={styleModal.container}>
            <span className={`${styleModal.closeIcon} mt-15 mr-10`}  onClick={props.exit} ><CloseIcon type="primary" /></span>
            <div>{props.children}</div>
        </div>
        </>,
        document.getElementById("react-modals")
    )
}