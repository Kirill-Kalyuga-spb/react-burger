import styles from './Orders.module.css';
import React from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import { useSelector } from 'react-redux';
import NavProfile from '../components/NavProfile/NavProfile';
import OrderList from '../components/OrderList/OrderList';

function Orders() {
    const {logged} = useSelector(state => state.auth)
   
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