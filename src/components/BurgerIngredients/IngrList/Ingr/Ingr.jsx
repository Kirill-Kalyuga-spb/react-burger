import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import stylesIngr from './Ingr.module.css';

export default function Ingr(props) {
    const count = 0;
    return (
        <li className={`${stylesIngr.item} mt-6`}>
            <img src={props.data.image} alt={props.data.name} className='pl-4'/>
            {count != 0 && <Counter count={count} size="default" extraClass="m-1" />}
            <p className={`${stylesIngr.p} text text_type_digits-default mt-1`}>{props.data.price}<span className='ml-1'><CurrencyIcon type="primary"/></span></p>
            <p className={`${stylesIngr.p} text text_type_main-default mt-1`}>{props.data.name}</p>
        </li>
    )
}