import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesHeader from './AppHeader.module.css';
import {Link, useLocation} from 'react-router-dom'

export default function AppHeader() {
    const path = useLocation().pathname.split('/')[1]
    const constr = path == ''
    const feed = path == 'feed'
    const profile = path == 'profile'
    return (
        <header className={stylesHeader.header}>
            <nav className={`${stylesHeader.nav} pt-4 pb-4`}>
                <ul className={stylesHeader.list}>
                    <li className={`${stylesHeader.listItem} pl-5`}>
                        <Link className={stylesHeader.link} to='/'>
                            <BurgerIcon type={constr ? 'primary' : 'secondary'} />
                            <p className={"text text_type_main-default pl-2 " + (constr ? null : 'text_color_inactive')}>Конструктор</p>
                        </Link>
                    </li>
                    <li className={`${stylesHeader.listItem} pl-4`}>
                        <Link className={stylesHeader.link} to='/feed'>
                            <ListIcon type={feed ? 'primary' : 'secondary'} />
                            <p className={"text text_type_main-default pl-2 " + (feed ? null : 'text_color_inactive')}>Лента заказов</p>
                        </Link>
                    </li>
                    <li className={stylesHeader.listItem}><Link to='/'><Logo /></Link></li>
                    <li className={`${stylesHeader.listItem} pr-5`}>
                        <Link className={stylesHeader.link} to='/profile'>
                            <ProfileIcon type={profile ? 'primary' : 'secondary'} />
                            <p className={"text text_type_main-default pl-2 " + (profile ? null : 'text_color_inactive')}>Личный кабинет</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}