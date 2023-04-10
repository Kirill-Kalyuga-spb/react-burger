import {
    CurrencyIcon,
    ConstructorElement,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useState } from 'react';
import stylesBurgerConstr from './BurgerConstructor.module.css';
import ModalOrder from '../ModalOrder/ModalOrder';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGR, ADD_BUN, postOrder, addIngr } from '../../services/actions/cart';
import {useDrop} from "react-dnd";
import BurgerConstructorIngr from './BurgerConstructorIngr/BurgerConstructorIngr';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/utility-function';

export default function BurgerConstructor() {
    const dispatch = useDispatch()
    const { bun, ingr } = useSelector(state => state.cart)
    const {logged} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const cookie = getCookie()

    const [{isHover}, drop] = useDrop({
        accept: "ingr",
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            if (item.type === 'bun') {
                dispatch({type: ADD_BUN, ingr: item})
            } else {
                dispatch(addIngr(item))
            }
        }
    })

    const sellCounter = () => {
        return ((bun.price || 0) + ingr.reduce((acc, item) => {
            return acc + item.price
        },0))
    }

    const sell = useMemo(() => sellCounter(), [bun, ingr]) || 0

    const handlerOpenModal = () => {
        if (!cookie.accessToken) {navigate('/login')}
        else {
        dispatch(postOrder([bun, ingr].flat()
            .map(item => {
                return item._id
            }), cookie))
        setState({visible: true})
        }
    }

    const handlerCloseModal = () => {
        setState({visible: false})
    }

    const [state,setState] = useState({visible: false})
    const modal = (<Modal exit={handlerCloseModal}><ModalOrder/></Modal>)
    
    return (
        <section className={stylesBurgerConstr.section} ref={drop}>
            <div className={`${stylesBurgerConstr.construcor} ml-4 pt-25`}>
              {(Object.keys(bun).length != 0 || ingr.length != 0) ?
                (Object.keys(bun).length != 0) && 
                (<div className={`pr-4`} >
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>)
                 : (<p className={stylesBurgerConstr.text + ' text text_type_main-medium mt-10'}>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</p>)}
                
                
                <ul className={`${stylesBurgerConstr.list} ${stylesBurgerConstr.scroll} mt-4 mb-4 ${ingr.length >= 6 ? "pr-2" : "pr-4"}`}>
                    {ingr.map((item, i) => {
                        return (
                            <BurgerConstructorIngr key={item.uuid} item={item} index={i} />
                        )
                    })}
                </ul>

                {(Object.keys(bun).length != 0) && (<div className={`pr-4`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>)}
                
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