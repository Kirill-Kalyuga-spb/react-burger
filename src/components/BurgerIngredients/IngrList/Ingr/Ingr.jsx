import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import Modal from '../../../Modal/Modal';
import ModalIngr from '../../../ModalIngr/ModalIngr';
import stylesIngr from './Ingr.module.css';

export default function Ingr(props) {
    const {ingr, bun} = useSelector(state => state.cart)
    const [counter, setCounter] = useState(null)
    const count = () => {
        return [ingr, bun].flat().filter(item => item._id === props.data._id).length
    }

    useEffect(() => {
        setCounter(count())
    }, [count])

    const [{isDrag},drag] = useDrag({
        type: 'ingr',
        item: props.data,
        collect: monitor => ({
            isDrag: monitor.isDragging
        })
    })

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
        <li ref={drag} className={`${stylesIngr.item} mt-6`} onClick={handlerOpenModal} >
            <img src={props.data.image} alt={props.data.name} className='pl-4'/>
            {counter != 0 && <Counter count={counter} size="default" extraClass="m-1" />}
            <p className={`${stylesIngr.p} text text_type_digits-default mt-1`}>{props.data.price}<span className='ml-1'><CurrencyIcon type="primary"/></span></p>
            <p className={`${stylesIngr.p} text text_type_main-default mt-1`}>{props.data.name}</p>
        </li>
        {state.visible && modal}
        </>
    )
}