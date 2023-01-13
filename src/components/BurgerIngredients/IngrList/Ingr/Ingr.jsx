import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import Modal from '../../../Modal/Modal';
import ModalIngr from '../../../ModalIngr/ModalIngr';
import stylesIngr from './Ingr.module.css';

export default function Ingr(props) {
    const count = 0;

    const handlerOpenModal = () => {
        setState({visible: true})
    }

    const handlerCloseModal = () => {
        setState({visible: false})
    }

    const [state,setState] = React.useState({visible: false})
    const modal = (<Modal exit={handlerCloseModal} ><ModalIngr data={props.data} /></Modal>)

    return (
        <>
        <li className={`${stylesIngr.item} mt-6`} onClick={handlerOpenModal} >
            <img src={props.data.image} alt={props.data.name} className='pl-4'/>
            {count != 0 && <Counter count={count} size="default" extraClass="m-1" />}
            <p className={`${stylesIngr.p} text text_type_digits-default mt-1`}>{props.data.price}<span className='ml-1'><CurrencyIcon type="primary"/></span></p>
            <p className={`${stylesIngr.p} text text_type_main-default mt-1`}>{props.data.name}</p>
        </li>
        {state.visible && modal}
        </>
    )
}