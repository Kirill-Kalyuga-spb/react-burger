import styles from './Orders.module.css';
import {useEffect} from 'react'
import NavProfile from '../components/NavProfile/NavProfile';
import OrderList from '../components/OrderList/OrderList';
import { wsConnectedExit, wsConnectedUser } from '../services/actions/ws';
import { getCookie } from '../utils/utility-function';
import { useDispatch } from '../hooks/hooks';

function Orders() {
    const dispatch = useDispatch()
    const cookie: {accessToken: string} = getCookie()

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