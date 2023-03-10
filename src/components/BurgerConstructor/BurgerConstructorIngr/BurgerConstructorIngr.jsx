import {
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { MOVE_INGR, REMOVE_INGR, HOVER_INGR } from '../../../services/actions/cart';

import stylesBurgerConstrIngr from './BurgerConstructorIngr.module.css';


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
            dispatch({type: HOVER_INGR, item: item, indexDrop: index})
            item.index = index
        }
    })

    const removeItem = () => {
        dispatch({
            type: REMOVE_INGR,
            item: {index}
        })
    }

    const opacity = isDragging ? 0.5 : isOver ? 1 : 1

    drag(drop(ref))

    return (
        <li ref={ref} index={index} style={{opacity}} className={`${stylesBurgerConstrIngr.item} mb-4 mr-2`}>
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