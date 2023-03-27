import styles from './OrderInfo.module.css';
import React, { useEffect } from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import { useLocation, useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_START } from '../services/actions/ws';

function OrderInfo() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const path = useLocation().pathname
    const _id = path.split('/profile/orders/')[1]

    const {orders} = useSelector(state => state.orders)
    
    const order = orders.find((order) => (order._id == _id))
    const {ingredients, status, name, number, createdAt, updatedAt} = order || {}

    const items = useSelector(state => state.items.items.data)

    const color = status == 'created' ? 'white' : status == 'done' ? '#00CCCC' : 'red'
    const word = status == 'created' ? 'Готовится' : status == 'done' ? 'Выполнен' : 'Отменён'

    const ingredientsData = ingredients ? ingredients.reduce((acc, ingredient) => {
        if (acc[ingredient]) {
          acc[ingredient].count += 1;
          return acc;
        } else {
          acc[ingredient] =  { _id: ingredient, count: 1 };
        }
        return acc;
      }, []) : undefined

    const ingrArr = ingredientsData ? Object.entries(ingredientsData).map((arr) => (
        arr.slice(1,2)
    )).flat().map((data) => (
        {...items.find(item => item._id == data._id), 'counter':  data.count}
    )) : undefined
    
    const price = ingrArr ? ingrArr.reduce((acc, item) => (
        acc += item.price * item.counter
    ), 0) : null

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START})
    }, [dispatch])

    return (
        <React.StrictMode>
            <AppHeader />
            {ingrArr ? (<section className={styles.container}>
                <p className={`${styles.numberOrder} text text_type_digits-default`}>#{number}</p>
                <h2 className="text text_type_main-medium mt-10">{name}</h2>
                <p className="text text_type_main-default mt-3" style={{color: color}}>{word}</p>
                <p className="text text_type_main-medium mt-15">Состав:</p>
                <ul className={`${styles.scroll} ${styles.list} mt-6`}>
                    {ingrArr.map((item, index) => (
                        <li className={`${styles.listItem} mt-4 pr-6`} key={index}>
                            <img src={item.image} alt={item.name} className={`${styles.img} mr-4`} />
                            <p className={`${styles.p} text text_type_main-default mr-4`}>{item.name}</p>
                            <div className={`${styles.div}`}>
                                <p className='text text_type_digits-default mr-2'><span>{item.counter}</span> x {item.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={`${styles.div} mt-10`}>
                    <p className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(createdAt)} />
                    </p>
                    <div className={styles.divPrice}>
                        <p className={`${styles} text text_type_digits-default mr-2`}>{price} </p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </section>) : <p>Loading...</p> }
        </React.StrictMode>
    )
}

export default OrderInfo