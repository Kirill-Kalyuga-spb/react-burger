import React from "react";
import stylesModalOrder from './ModalOrder.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import orderImg from './../../images/graphics.svg'

export default function ModalOrder(props) {

    return (
        <>
            <ModalOverlay exit={props.exit} >
                <h2 className={`${stylesModalOrder.text} text text_type_digits-large mt-30`}>034536</h2>
                <h3 className={`${stylesModalOrder.text} text text_type_main-medium mt-8`}>идентификатор заказа</h3>
                <img className={`${stylesModalOrder.img} mt-15`} src={orderImg} />
                <p className={`${stylesModalOrder.text} text text_type_main-default mt-15`}>ваш заказ начали готовить</p>
                <p className={`${stylesModalOrder.text} text text_type_main-default text_color_inactive mt-2 mb-30`}>дождитесь готовности на орбитальной станции</p>
            </ModalOverlay>
        </>
    )
}