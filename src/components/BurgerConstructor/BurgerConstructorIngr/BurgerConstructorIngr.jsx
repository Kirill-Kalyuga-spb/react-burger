import {
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { MOVE_INGR, REMOVE_INGR } from '../../../services/actions/cart';

import stylesBurgerConstrIngr from './BurgerConstructorIngr.module.css';


export default function BurgerConstractorIngr({item, index}) {
    const dispatch = useDispatch()
    const [{isDragging}, drag] = useDrag({
        type: 'ingrContainer',
        item: {item, index},
        collect: monitor => ({
            isDragging: monitor.isDragging
        })
    })

    const [,drop] = useDrop({
        accept: 'ingrContainer',
        drop(item) {
            dispatch({type: MOVE_INGR, item: item, indexDrop: index})
        }
    })

    const removeItem = () => {
        dispatch({
            type: REMOVE_INGR,
            item: {index}
        })
    }

    return (
        <li ref={drop} index={index} className={`${stylesBurgerConstrIngr.item} mb-4 mr-2`}>
            <span ref={drag} className={`mr-2`}>
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