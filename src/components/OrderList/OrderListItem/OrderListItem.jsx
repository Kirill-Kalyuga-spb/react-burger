import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styles from './OrderListItem.module.css'

export default function OrderListItem ({data}) {
    const {_id, ingredients, status, name, number, createdAt, updatedAt} = data
    const items = useSelector(state => state.items.items.data)
    const path = useLocation().pathname.split('/')[1]
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
        <li className={`mb-6 ${styles.listItem} p-6`} key={_id} >
            <Link to={path == 'feed' ? `/feed/${_id}` : `/profile/orders/${_id}`} className={styles.link} >
            <div className={styles.div}>
                <p className=" text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(createdAt)} /></p>
            </div>
            <h2 className="text text_type_main-medium mt-6">{name}</h2>
            <p className="text text_type_main-default mt-2" style={{color: color}} >{word}</p>
            <div className={`${styles.div} mt-6`}>
                <div className={styles.div1}>
                    {dataImg.map((item, index, arr) => {
                        if (index > 5) {return null}
                        if (index === 5) {
                            return (
                            <div className={styles.rel} style={{ zIndex: dataImg.length - index }} key={index}>
                                <p className={`${styles.cover}` + " text text_type_digits-default"}>+{arr.length - index}</p>
                                <img src={item} alt='ингредиент' className={styles.img} />
                            </div>)
                        }
                       return (<img src={item} alt='ингредиент' key={index} className={styles.img} style={{zIndex: dataImg.length - index}} />)
                        })}
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