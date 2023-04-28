import styles from './OrderInfo.module.css';
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { wsConnectedAll, wsConnectedExit, wsConnectedUser } from '../services/actions/ws';
import { getCookie } from '../utils/utility-function';
import { TIngredient, TOrder } from '../services/types/data';
import { useDispatch, useSelector } from '../hooks/hooks';

function OrderInfo() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const path = useLocation().pathname
    const {otherPath} = useLocation().state || false
    
    const cookie: any = getCookie()
    const _id = path.split('/profile/orders/')[1] || path.split('/feed/')[1]

    const {orders, wsConnected}: {wsConnected: boolean, orders: Array<TOrder>} = useSelector(state => state.orders)
    
    const order = orders.find((order) => (order._id == _id))
    const {ingredients, status, name, number, createdAt, updatedAt} = order || {createdAt: 0}

    const items: Array<TIngredient> = useSelector(state => state.items.items)

    const color = status == 'created' ? 'white' : status == 'done' ? '#00CCCC' : 'red'
    const word = status == 'created' ? 'Готовится' : status == 'done' ? 'Выполнен' : 'Отменён'
    const justify = !otherPath ? 'center' : 'start'

    const ingredientsData = ingredients ? ingredients.reduce((acc: any, ingredient: any) => {
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
    )).flat().map((data: any) => (
        {...items.find(item => item._id == data._id), 'counter':  data.count}
    )) : undefined
    
    const price = ingrArr ? ingrArr.reduce((acc, item: any) => (
        acc += item.price * item.counter
    ), 0) : null

    useEffect(() => {
        if (!wsConnected) {
            path.split('/')[1] == 'feed' ? dispatch(wsConnectedAll())
                : dispatch(wsConnectedUser(cookie.accessToken))
        }
    }, [dispatch, wsConnected])
    
    useEffect(():any => {
        if (!wsConnected && orders.length) {return () => dispatch(wsConnectedExit())}
    }, [dispatch])

    return (
        ingrArr ? (<section className={styles.container + ` ${otherPath ? 'mt-10' : 'mt-30'}`}>
            <p className={`${styles.numberOrder} text text_type_digits-default`} style={{justifyContent:justify}} >#{number}</p>
            <h2 className="text text_type_main-medium mt-5" >{name}</h2>
            <p className="text text_type_main-default mt-3" style={{ color: color }}>{word}</p>
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
            <div className={`${styles.div} mt-10 mb-10`}>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(createdAt)} />
                </p>
                <div className={styles.divPrice}>
                    <p className={`${styles} text text_type_digits-default mr-2`}>{price} </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>) : <p>Loading...</p>
    )
}

export default OrderInfo