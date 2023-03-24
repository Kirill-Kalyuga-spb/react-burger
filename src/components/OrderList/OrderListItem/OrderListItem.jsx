import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import styles from './OrderListItem.module.css'

export default function OrderListItem ({data}) {
    const dataImg = ["https://code.s3.yandex.net/react/code/meat-03.png", "https://code.s3.yandex.net/react/code/meat-03-large.png", "https://code.s3.yandex.net/react/code/meat-03-mobile.png"]
    const dataImgO = ["https://code.s3.yandex.net/react/code/meat-03.png"]
    const id = '1234567'
    return (
        <li className={`mb-6 ${styles.listItem} p-6`}>
            <Link to={`/profile/orders/${id}`} className={styles.link} >
            <div className={styles.div}>
                <p className=" text text_type_digits-default">#034535</p>
                <p className="text text_type_main-default text_color_inactive mt-6">Сегодня, 16:20 i-GMT+3</p>
            </div>
            <h2 className="text text_type_main-medium mt-6">Death Star Starship Main бургер</h2>
            <p className="text text_type_main-default mt-2">Создан</p>
            <div className={`${styles.div} mt-6`}>
                <div>
                    {dataImg.map((item, index) => (
                        <img src={item} alt='ингредиент' key={index} className={styles.img} style={{zIndex: dataImg.length - index}} />
                    ))}
                </div>
                <div className={styles.divPrice}>
                    <p className={`${styles.p} text text_type_digits-default mr-2`}>480 </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
            </Link>
        </li>
    )
}