import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react';
import stylesBurgerIngr from './BurgerIngredients.module.css';
import IngrList from './IngrList/IngrList';

export default function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('bun');

    const refBun = React.useRef(null)
    const refSause = React.useRef(null)
    const refMain = React.useRef(null)

    const handlerType = (e) => {
        setCurrent(e)
        const ref = e === 'bun' ? refBun : (e === 'main' ? refMain : refSause)
        ref.current.scrollIntoView()
    }

    return (
        <section>
            <h1 className='text text_type_main-large pt-10'>Соберите бургер</h1>
            <nav className={`${stylesBurgerIngr.nav} text text_type_main-default pt-5`}>
                <Tab value="bun" active={current === 'bun'} onClick={handlerType}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handlerType}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handlerType}>
                    Начинки
                </Tab>
            </nav>
            <ul className={`${stylesBurgerIngr.list} ${stylesBurgerIngr.scroll}`}>
                <IngrList ref={refBun} key='bun' type='bun' data={props.data} />
                <IngrList ref={refSause} key='sauce' type='sauce' data={props.data} />
                <IngrList ref={refMain} key='main' type='main' data={props.data} />
            </ul>
        </section>
    )
}