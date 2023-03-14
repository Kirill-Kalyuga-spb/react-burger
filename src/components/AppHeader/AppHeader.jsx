import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import stylesHeader from './AppHeader.module.css';
import {Link} from 'react-router-dom'

export default function AppHeader() {
    return (
        <header className={stylesHeader.header}>
            <nav className={`${stylesHeader.nav} pt-4 pb-4`}>
                <ul className={stylesHeader.list}>
                    <li className={`${stylesHeader.listItem} pl-5`}>
                        <Link className={stylesHeader.link} to='/'>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default pl-2">Конструктор</p>
                        </Link>
                    </li>
                    <li className={`${stylesHeader.listItem} pl-4`}>
                        <Link className={stylesHeader.link} to='/feed'>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default pl-2">Лента заказов</p>
                        </Link>
                    </li>
                    <li className={stylesHeader.listItem}><Logo /></li>
                    <li className={`${stylesHeader.listItem} pr-5`}>
                        <Link className={stylesHeader.link} to='/profile'>
                            <ProfileIcon type="secondary" />
                            <p className="text text_type_main-default pl-2">Личный кабинет</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}