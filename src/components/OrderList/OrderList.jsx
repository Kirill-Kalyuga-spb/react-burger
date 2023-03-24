import OrderListItem from "./OrderListItem/OrderListItem"
import styles from './OrderList.module.css'

export default function OrderList () {
    const data = [0,0,2,2] 
    return (
        <section className={`${styles.section} ${styles.scroll} pr-2`}>
            <ul className={`${styles.list}`}>
            {data.map(order => (
                    <OrderListItem data={order} key={order._id}/>
                ))}
            </ul>
        </section>
    )
}