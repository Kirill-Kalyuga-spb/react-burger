import styles from './OrderInfo.module.css';
import React from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderInfo() {
    const {id} = useParams()
    const dataImg = ["https://code.s3.yandex.net/react/code/meat-03.png", "https://code.s3.yandex.net/react/code/meat-03-large.png", "https://code.s3.yandex.net/react/code/meat-03-mobile.png"]

    return (
        <React.StrictMode>
            <AppHeader />
            <section className={styles.container}>
                <p className={`${styles.numberOrder} text text_type_digits-default`}>#034535</p>
                <h2 className="text text_type_main-medium mt-10">Death Star Starship Main бургер</h2>
                <p className="text text_type_main-default mt-3">Создан</p>
                <p className="text text_type_main-medium mt-15">Состав:</p>
                <ul className={`${styles.scroll} ${styles.list} mt-6`}>
                        {dataImg.map((item, index) => (
                            <li className={`${styles.listItem} mt-4`} key={index}>
                                <img src={item} alt='ингредиент' className={`${styles.img} mr-4`} />
                                <p className={`${styles.p} text text_type_main-default mr-4`}>Флюоресцентная булка R2-D3</p>
                                <div className={`${styles.div}`}>
                                    <p className='text text_type_digits-default'><sapn>2</sapn> x 20</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </li>
                        ))}
                </ul>
                <div className={`${styles.div} mt-10`}>
                    <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
                    <div className={styles.divPrice}>
                        <p className={`${styles} text text_type_digits-default mr-2`}>480 </p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </section>
        </React.StrictMode>
    )
}

export default OrderInfo