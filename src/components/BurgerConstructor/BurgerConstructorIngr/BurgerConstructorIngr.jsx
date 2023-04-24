import {
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { REMOVE_INGR, HOVER_INGR } from '../../../services/actionsTypes/cart';

import stylesBurgerConstrIngr from './BurgerConstructorIngr.module.css';
import { hoverIngrAction, removeIngrAction } from '../../../services/actions/cart';


export default function BurgerConstractorIngr({item, index}) {
    const dispatch = useDispatch()
    const ref = useRef(null)
    const [{isDragging}, drag] = useDrag({
        type: 'ingrContainer',
        item: {item, index},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const [{isOver},drop] = useDrop({
        accept: 'ingrContainer',
        collect: monitor => ({
            isOver: monitor.isOver()
          }),
        hover(item) {
            dispatch(hoverIngrAction(item.index,index))
            item.index = index
        }
    })

    const removeItem = () => {
        dispatch(removeIngrAction(index))
    }

    const opacity = isDragging ? 0.5 : isOver ? 1 : 1

    drag(drop(ref))

    return (
        <li ref={ref} index={index} style={{opacity}} className={`${stylesBurgerConstrIngr.item} mb-4`}>
            <span className={`mr-2`}>
                <DragIcon type="primary" />
            </span>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => {removeItem()}}
            />
        </li>
    )
}