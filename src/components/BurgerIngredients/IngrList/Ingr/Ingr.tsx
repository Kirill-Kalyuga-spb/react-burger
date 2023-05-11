import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useMemo, useState } from 'react';
import { useDrag } from 'react-dnd';
import Modal from '../../../Modal/Modal';
import ModalIngr from '../../../ModalIngr/ModalIngr';
import stylesIngr from './Ingr.module.css';
import PropTypes from "prop-types";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { TIngredient } from '../../../../services/types/data';
import { useSelector } from '../../../../hooks/hooks';

export default function Ingr({data} : {data: TIngredient}) {
    const { id } = useParams();
    const [state, setState] = useState({visible: Boolean(id == data._id && id != undefined ) })
    const {ingr, bun} = useSelector(state => state.cart)
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    
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

    const modal = (<Modal exit={handlerCloseModal} ><ModalIngr data={data} /></Modal>)

    useEffect(() => {
        if (!state.visible && id == data._id) {
            navigate('/')
        }    
    }, [state])
    
    return (
        <>
        <li ref={drag} className={`${stylesIngr.item} mt-6`} onClick={handlerOpenModal} >
            <Link className={stylesIngr.link}  to={'/ingredients/' + `${data._id}`} state={{otherPath: true}}>
            <img src={data.image} alt={data.name} className='pl-4'/>
            {count != 0 && <Counter count={count} size="default" extraClass="m-1" />}
            <p className={`${stylesIngr.p} text text_type_digits-default mt-1`}>{data.price}<span className='ml-1'><CurrencyIcon type="primary"/></span></p>
            <p className={`${stylesIngr.p} text text_type_main-default mt-1`}>{data.name}</p>
            </Link>
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