import styles from './Profile.module.css';
import React, {useState} from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import {
    EmailInput,
    PasswordInput,
    Input,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '../services/actions/auth';

function Profile()  {
    const [form, setValue] = useState({ name: '', email: '', password: '' });
    const inputRef = React.useRef(null)
    const dispatch = useDispatch()
    const {accessToken, refreshToken} = useSelector(state => state.auth)

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

    const onIconClick = e => {
        // inputRef.current.removeAttribute('disabled')
        // inputRef.current.classList.remove('input__textfield-disabled')
        inputRef.current.focus()
    }

    const onClick = e => {
        dispatch(postLogout(refreshToken))
    }

    if (accessToken == '') {
        return <Navigate to={'/login'}/>
    }

    return (
        <React.StrictMode>
            <AppHeader />
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><Link className={styles.link} to='/profile'><p className={`text_type_main-medium`}>Профиль</p></Link></li>
                        <li className={styles.listItem}><Link className={styles.link} to='/profile/orders'><p className={`text_type_main-medium text_color_inactive`}>История заказов</p></Link></li>
                        <li className={styles.listItem}>
                            <Button onClick={onClick} htmlType="button" type="secondary" extraClass={styles.link}>
                                <p className={`text_type_main-medium text_color_inactive`}>Выход</p>
                            </Button>
                        </li>
                    </ul>
                    <p className={`${styles.p} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
                </nav>
                <form className={styles.form}>
                    <Input
                        placeholder='Имя'
                        type={'text'}
                        value={form.name}
                        name='name'
                        onChange={onChange}
                        icon='EditIcon'
                        onIconClick={onIconClick}
                        ref={inputRef}
                    />
                    <EmailInput
                        placeholder="Логин"
                        value={form.email}
                        name="email"
                        onChange={onChange}
                        isIcon={true}
                    />
                    <PasswordInput
                        placeholder="Пароль"
                        value={form.password}
                        name={"password"}
                        onChange={onChange}
                        icon="EditIcon"
                    />
                </form>
            </div>
        </React.StrictMode>
    )
}

export default Profile