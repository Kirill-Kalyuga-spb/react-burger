import OrderListItem from "./OrderListItem/OrderListItem"
import styles from './OrderList.module.css'
import { TOrder } from "../../services/types/data"
import { useSelector } from "../../hooks/hooks"

export default function OrderList () {
    const {orders}: {orders: Array<TOrder>} = useSelector(state => state.orders)
    
    return (
        <div className={`${styles.section} ${styles.scroll} pr-2`}>
            <ul className={`${styles.list}`}>
            {orders.map(order => (
                    <OrderListItem data={order} key={order._id}/>
                ))}
            </ul>
        </div>
    )
}