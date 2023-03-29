import styles from './Orders.module.css';
import React, {useEffect} from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import NavProfile from '../components/NavProfile/NavProfile';
import OrderList from '../components/OrderList/OrderList';
import { WS_CONNECTION_START } from '../services/actions/ws';
import { getCookie } from '../utils/utility-function';

function Orders() {
    const {logged} = useSelector(state => state.auth)
    const orders = useSelector(state => state.orders)
    const dispatch = useDispatch()
    const cookie = getCookie()

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, payload: cookie.accessToken})
    }, [dispatch])
   
    return (
        <React.StrictMode>
            <AppHeader />
            <div className={styles.container}>
                <NavProfile/>
                <OrderList/>
            </div>
        </React.StrictMode>
    )
}

export default Orders