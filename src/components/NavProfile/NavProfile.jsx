import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { postLogout } from "../../services/actions/auth"
import { getCookie } from "../../utils/utility-function"
import styles from './NavProfile.module.css'
import {
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function NavProfile () {
    const dispatch = useDispatch()
    const cookie = getCookie()
    const location = useLocation()

    const onClickExit = e => {
        dispatch(postLogout(cookie.refreshToken))
    }

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.listItem}><Link className={styles.link} to='/profile'><p className={`text_type_main-medium ` + ((location.pathname == '/profile') ? null : 'text_color_inactive')}>Профиль</p></Link></li>
                <li className={styles.listItem}><Link className={styles.link} to='/profile/orders'><p className={`text_type_main-medium ` + ((location.pathname == '/profile/orders') ? null : 'text_color_inactive')}>История заказов</p></Link></li>
                <li className={styles.listItem}>
                    <Button onClick={onClickExit} htmlType="button" type="secondary" extraClass={styles.link}>
                        <p className={`text_type_main-medium text_color_inactive`}>Выход</p>
                    </Button>
                </li>
            </ul>
            <p className={`${styles.p} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
    )
}