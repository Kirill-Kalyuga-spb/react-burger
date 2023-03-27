import styles from './Feed.module.css';
import React, {useEffect, useState} from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import OrderList from '../components/OrderList/OrderList';
import { WS_CONNECTION_START } from '../services/actions/ws';

function Feed() {
    const {logged} = useSelector(state => state.auth)
    const orders = useSelector(state => state.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START})
    }, [dispatch])

    return (
        <React.StrictMode>
            <AppHeader />
            <section className={styles.section + ' mt-10'}>
                <h2  className="text text_type_main-large">Лента заказов</h2>
                <div className={styles.container + ' mt-5'}>
                    <OrderList />
                    <div>
                        <div className={styles.div}>
                            <div className={styles.div1 + ' mr-9'}>
                                <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
                                <p className={styles.p  + " text text_type_digits-default mb-2"}>034533</p>
                                <p className={styles.p  + " text text_type_digits-default mb-2"}>034533</p>
                                <p className={styles.p  + " text text_type_digits-default mb-2"}>034533</p>
                                <p className={styles.p  + " text text_type_digits-default mb-2"}>034533</p>
                                <p className={styles.p  + " text text_type_digits-default"}>034533</p>
                            </div>
                            <div className={styles.div1}>
                                <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
                                <p className="text text_type_digits-default mb-2">034533</p>
                                <p className="text text_type_digits-default mb-2">034533</p>
                                <p className="text text_type_digits-default">034533</p>
                            </div>
                        </div>
                        <h4 className="text text_type_main-medium mt-15">Выполнено за все время:</h4>
                        <p className={styles.digits + " text text_type_digits-large"}>{orders.total}</p>
                        <h4 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h4>
                        <p className={styles.digits + " text text_type_digits-large"}>{orders.totalToday}</p>
                    </div>
                </div>
            </section>
        </React.StrictMode>
    )
}

export default Feed