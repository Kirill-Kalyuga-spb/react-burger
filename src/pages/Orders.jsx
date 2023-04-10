import styles from './Orders.module.css';
import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import NavProfile from '../components/NavProfile/NavProfile';
import OrderList from '../components/OrderList/OrderList';
import { wsConnectedExit, wsConnectedUser } from '../services/actions/ws';
import { getCookie } from '../utils/utility-function';

function Orders() {
    const dispatch = useDispatch()
    const cookie = getCookie()

    useEffect(() => {
        dispatch(wsConnectedUser(cookie.accessToken))
        return (() => { dispatch(wsConnectedExit()) })
    }, [dispatch])
   
    return (
        <div className={styles.container}>
            <NavProfile />
            <OrderList />
        </div>
    )
}

export default Orders