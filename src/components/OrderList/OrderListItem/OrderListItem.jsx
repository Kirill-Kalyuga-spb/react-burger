import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './OrderListItem.module.css'

export default function OrderListItem ({data}) {
    const {_id, ingredients, status, name, number, createdAt, updatedAt} = data
    const items = useSelector(state => state.items.items.data)
    const color = status == 'created' ? 'white' : status == 'done' ? '#00CCCC' : 'red'
    const word = status == 'created' ? 'Готовится' : status == 'done' ? 'Выполнен' : 'Отменён'

    const ingr = ingredients.map((id) => (
        items.find(item => item._id == id)
    ))
    const price = ingr.reduce((acc, item) => (
        acc += item.price
    ), 0)
    const dataImg = ingr.map((ingr) => (
        ingr.image
    ))

    return (
        <li className={`mb-6 ${styles.listItem} p-6`}>
            <Link to={`/profile/orders/${_id}`} className={styles.link} >
            <div className={styles.div}>
                <p className=" text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(createdAt)} /></p>
            </div>
            <h2 className="text text_type_main-medium mt-6">{name}</h2>
            <p className="text text_type_main-default mt-2" style={{color: color}} >{word}</p>
            <div className={`${styles.div} mt-6`}>
                <div>
                    {dataImg.map((item, index) => (
                        <img src={item} alt='ингредиент' key={index} className={styles.img} style={{zIndex: dataImg.length - index}} />
                    ))}
                </div>
                <div className={styles.divPrice}>
                    <p className={`${styles.p} text text_type_digits-default mr-2`}>{price} </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
            </Link>
        </li>
    )
}