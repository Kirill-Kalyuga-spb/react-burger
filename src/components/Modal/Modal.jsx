import {
    CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styleModal from './Modal.module.css';

export default function Modal(props) {
    const {orderSuccess, orderFailed} = useSelector(state => state.cart)

    return createPortal(
        <>
        <ModalOverlay exit={props.exit} />
        <div className={styleModal.container}>
            <span className={`${styleModal.closeIcon} mt-15 mr-10`}  onClick={props.exit} ><CloseIcon type="primary" /></span>
            {orderSuccess ? (<div>{props.children}</div>) 
            : orderFailed ? <p className={styleModal.p + ' text text_type_main-medium'}>error{' : ('}</p> 
            : <p className={styleModal.p + ' text text_type_main-medium'}>loading...</p>}
        </div>
        </>,
        document.getElementById("react-modals")
    )
}