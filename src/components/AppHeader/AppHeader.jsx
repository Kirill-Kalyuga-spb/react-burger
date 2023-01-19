import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import stylesHeader from './AppHeader.module.css';

export default function AppHeader() {
    return (
        <header className={stylesHeader.header}>
            <nav className={`${stylesHeader.nav} pt-4 pb-4`}>
                <ul className={stylesHeader.list}>
                    <li className={`${stylesHeader.listItem} pl-5`}>
                        <a className={stylesHeader.link} href="#">
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default pl-2">Конструктор</p>
                        </a>
                    </li>
                    <li className={`${stylesHeader.listItem} pl-4`}>
                        <a className={stylesHeader.link} href="#">
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default pl-2">Лента заказов</p>
                        </a>
                    </li>
                    <li className={stylesHeader.listItem}><Logo /></li>
                    <li className={`${stylesHeader.listItem} pr-5`}>
                        <a className={stylesHeader.link} href="#">
                            <ProfileIcon type="secondary" />
                            <p className="text text_type_main-default pl-2">Личный кабинет</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}