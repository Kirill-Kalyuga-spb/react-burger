import React from 'react';
// import data from '../../../utils/data';
import stylesIngrList from './IngrList.module.css';
import Ingr from './Ingr/Ingr';

export default React.forwardRef(function IngrList(props, ref) {
    const type = props.type;
    const name = type === 'main' ? 'Начинка' : (props.type === 'bun' ? 'Булки' : 'Соусы')
    const items = props.data === undefined ? [] : props.data.filter(item => (item.type === type))
    
    return (
        <li>
            <h2 ref={ref} className="text text_type_main-medium mt-10">{name}</h2>
            <ul className={`${stylesIngrList.list} pl-6 pr-6`}>
                {items.map(item => (
                    <Ingr data={item} key={item._id}/>
                ))}
            </ul>
        </li >
    )
})