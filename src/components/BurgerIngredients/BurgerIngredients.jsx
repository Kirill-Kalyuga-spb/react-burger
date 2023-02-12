import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import { spaceFromBlockToTop } from '../../utils/constants';
import stylesBurgerIngr from './BurgerIngredients.module.css';
import IngrList from './IngrList/IngrList';

export default function BurgerIngredients(props) {
    const [current, setCurrent] = useState('bun');
    
    const refList = useRef(null)

    const refBun = useRef(null)
    const refSause = useRef(null)
    const refMain = useRef(null)

    const handlerType = (e) => {
        setCurrent(e)
        const ref = e === 'bun' ? refBun : (e === 'main' ? refMain : refSause)
        ref.current.scrollIntoView({ behavior: "smooth" })
    }

    const bunTop = () => {
        return Math.abs(refBun.current.getBoundingClientRect().top - spaceFromBlockToTop)
    }
    const sauseTop = () => {
        return Math.abs(refSause.current.getBoundingClientRect().top - spaceFromBlockToTop)
    }
    const mainTop = () => {
        return Math.abs(refMain.current.getBoundingClientRect().top - spaceFromBlockToTop)
    }

    const handlerScroll = () => {
        refList.current.addEventListener('scroll', function() {
            
            if (bunTop() < sauseTop() && bunTop() < mainTop()) {
                setCurrent('bun')
            }
            if (sauseTop() < bunTop() && sauseTop() < mainTop()) {
                setCurrent('sauce')
            }
            if (mainTop() < sauseTop() && mainTop() < bunTop()) {
                setCurrent('main')
            }
          })
    }

    useEffect(() => {
        handlerScroll()
    }, [refList])

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
            <ul ref={refList} className={`${stylesBurgerIngr.list} ${stylesBurgerIngr.scroll}`}>
                <IngrList ref={refBun} key='bun' type='bun' data={props.data} />
                <IngrList ref={refSause} key='sauce' type='sauce' data={props.data} />
                <IngrList ref={refMain} key='main' type='main' data={props.data} />
            </ul>
        </section>
    )
}