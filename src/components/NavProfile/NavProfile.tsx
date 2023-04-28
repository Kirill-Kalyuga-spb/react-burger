import { Link, useLocation } from "react-router-dom"
import { postLogout } from "../../services/actions/auth"
import { getCookie } from "../../utils/utility-function"
import styles from './NavProfile.module.css'
import {
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { textProfile, textProfileOrders } from "../../utils/constants"
import { useDispatch } from "../../hooks/hooks";

export default function NavProfile () {
    const dispatch = useDispatch()
    const cookie = getCookie()
    const location = useLocation()
    const logicPath = location.pathname.split('/')[2] == 'orders'
    const text = logicPath ? textProfileOrders : textProfile

    const onClickExit = () => {
        dispatch(postLogout(cookie.refreshToken))
    }

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.listItem}><Link className={styles.link} to='/profile'><p className={`text_type_main-medium ` + (!logicPath ? null : 'text_color_inactive')}>Профиль</p></Link></li>
                <li className={styles.listItem}><Link className={styles.link} to='/profile/orders'><p className={`text_type_main-medium ` + (logicPath ? null : 'text_color_inactive')}>История заказов</p></Link></li>
                <li className={styles.listItem}>
                    <Button onClick={onClickExit} htmlType="button" type="secondary" extraClass={styles.link}>
                        <p className={`text_type_main-medium text_color_inactive`}>Выход</p>
                    </Button>
                </li>
            </ul>
            <p className={`${styles.p} text text_type_main-default text_color_inactive`}>{text}</p>
        </nav>
    )
}