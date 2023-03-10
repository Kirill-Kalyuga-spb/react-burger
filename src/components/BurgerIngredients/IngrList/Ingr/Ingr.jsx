import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import Modal from '../../../Modal/Modal';
import ModalIngr from '../../../ModalIngr/ModalIngr';
import stylesIngr from './Ingr.module.css';
import PropTypes from "prop-types";

export default function Ingr({data}) {
    const {ingr, bun} = useSelector(state => state.cart)
   
    const count = useMemo(() => {
        return [ingr, bun].flat().filter(item => item._id === data._id).length
    }, [ingr, bun])

    const [{isDrag},drag] = useDrag({
        type: 'ingr',
        item: data,
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
    const modal = (<Modal exit={handlerCloseModal} ><ModalIngr data={data} /></Modal>)

    return (
        <>
        <li ref={drag} className={`${stylesIngr.item} mt-6`} onClick={handlerOpenModal} >
            <img src={data.image} alt={data.name} className='pl-4'/>
            {count != 0 && <Counter count={count} size="default" extraClass="m-1" />}
            <p className={`${stylesIngr.p} text text_type_digits-default mt-1`}>{data.price}<span className='ml-1'><CurrencyIcon type="primary"/></span></p>
            <p className={`${stylesIngr.p} text text_type_main-default mt-1`}>{data.name}</p>
        </li>
        {state.visible && modal}
        </>
    )
}

Ingr.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired
    }).isRequired
}