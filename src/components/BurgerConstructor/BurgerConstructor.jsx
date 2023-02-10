import {
    CurrencyIcon,
    ConstructorElement,
    Button,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import stylesBurgerConstr from './BurgerConstructor.module.css';
import data from '../../utils/data';
import ModalOrder from '../ModalOrder/ModalOrder';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { ADD_INGR, ADD_BUN } from '../../services/actions/cart';
import {useDrop} from "react-dnd";

export default function BurgerConstructor() {
    const [sell, setSell] = useState(null)
    const sellBunRef = useRef(null)
    const dispatch = useDispatch()

    const [{isHover}, drop] = useDrop({
        accept: "ingr",
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            if (item.info.type === 'bun') {
                dispatch({type: ADD_BUN, ingr: item.info})
            } else {
                dispatch({type: ADD_INGR, ingr: item.info})
            }
        }
    })
    
    useEffect(() => {
        const arrItems = Array.from(document.querySelector(`.${stylesBurgerConstr.list}`).querySelectorAll(`.${stylesBurgerConstr.item}`))
        const sellItems = arrItems.reduce((acc, item) => {
            const sellItem = item.querySelector('.constructor-element__price').textContent
            
            return Number(acc) +  Number(sellItem)
        }, 0)
       
        setSell(Number(sellItems) + Number(sellBun()))
    }, [])

    const sellBun = () => {
        if (sellBunRef.current !== null)
        {return sellBunRef.current.querySelector('.constructor-element__price').textContent}
    }

    const handlerOpenModal = () => {
        setState({visible: true})
    }

    const handlerCloseModal = () => {
        setState({visible: false})
    }

    const [state,setState] = useState({visible: false})
    const modal = (<Modal exit={handlerCloseModal}><ModalOrder/></Modal>)

    return (
        <section ref={drop}>
            <div className={`${stylesBurgerConstr.construcor} ml-4 pt-25`}>

                <div className={`pr-4`} ref={sellBunRef}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={1255}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
                
                <ul className={`${stylesBurgerConstr.list} ${stylesBurgerConstr.scroll} mt-4 mb-4`}>
                    {data.map((item) => {
                        if (item.type === 'main' || item.type === 'sauce') {
                            
                            return (
                                <li key={item._id} className={`${stylesBurgerConstr.item} mb-4 mr-2`}>
                                    <span className={`mr-2`}>
                                        <DragIcon type="primary" />
                                    </span>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>)
                        }
                    })}
                </ul>

                <div className={`pr-4`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={1255}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
            </div>
            <div className={`${stylesBurgerConstr.order} ml-4 mr-4 mt-10`}>
                <p className={`${stylesBurgerConstr.p} text text_type_digits-medium pr-10`}>
                    {sell}
                    <span className={`${stylesBurgerConstr.currencyIcon} ml-4 mr-1`}>
                        <CurrencyIcon type="primary"/>
                    </span>
                </p>
                <Button htmlType="button" type="primary" size="medium" onClick={handlerOpenModal}>
                    Оформить заказ
                </Button>
                {state.visible && modal}
            </div>
        </section>
    )
}