import styles from './Feed.module.css';
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OrderList from '../components/OrderList/OrderList';
import { WS_CONNECTION_START, WS_EXIT } from '../services/actions/ws';

function Feed() {
    const {logged} = useSelector(state => state.auth)
    const orders = useSelector(state => state.orders)
    const dispatch = useDispatch()

    const done = orders.orders.filter((order) => order.status == 'done')
    const created = orders.orders.filter((order) => order.status =='created')

    function sliceIntoChunks(arr, chunkSize) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    const arrDone = sliceIntoChunks(done, 10)
    const arrCreated = sliceIntoChunks(created, 10)

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START})
        return (() => { dispatch({ type: WS_EXIT }) })
    }, [dispatch])

    return (
            <section className={styles.section + ' mt-10'}>
                <h2  className="text text_type_main-large">Лента заказов</h2>
                <div className={styles.container + ' mt-5'}>
                    <OrderList />
                    <div>
                        <div className={styles.div}>
                            <div className={styles.div1 + ' mr-9'}>
                                <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
                                <div className={styles.listContainer + " " + styles.scroll}>
                                    {arrDone.map((arr, index) => (<ul key={index} className={styles.list}>
                                        {arr.map((order, index) => {
                                            return (<li key={order._id} className={styles.p + ` ${styles.li}` + " text text_type_digits-default mb-2"}>{order.number}</li>)
                                        })}
                                    </ul>))}
                                </div>
                            </div>
                            <div className={styles.div1}>
                                <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
                                <div className={styles.listContainer + " " + styles.scroll}>
                                    {arrCreated.map((arr, index) => (<ul key={index} className={styles.list}>
                                        {arr.map((order, index) => {
                                            return (<li key={order._id} className={`${styles.li}` + " text text_type_digits-default mb-2"}>{order.number}</li>)
                                        })}
                                    </ul>))}
                                </div>
                            </div>
                        </div>
                        <h4 className="text text_type_main-medium mt-15">Выполнено за все время:</h4>
                        <p className={styles.digits + " text text_type_digits-large"}>{orders.total}</p>
                        <h4 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h4>
                        <p className={styles.digits + " text text_type_digits-large"}>{orders.totalToday}</p>
                    </div>
                </div>
            </section>
    )
}

export default Feed