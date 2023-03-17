import styles from './Login.module.css';
import React, {useState} from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import {
    EmailInput,
    PasswordInput,
    Button,
    Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom'
import { postRegister } from '../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../utils/utility-function';

function Register()  {
    const [form, setValue] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch()
    // const {accessToken} = useSelector(state => state.auth) //ререндерит компонент после диспатча
    // const cookie = getCookie()

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

    const onClick = e => {
        dispatch(postRegister(form))
    }

    // if (cookie.accessToken) {
    //     return <Navigate to={'/'}/>
    // }

    return (
        <React.StrictMode>
            <AppHeader />
            <div className={styles.container}>
                <form className={styles.form}>
                    <h1 className={`${styles.heading} text text_type_main-medium`}>Регистрация</h1>
                    <Input
                        placeholder='Имя'
                        value={form.name}
                        name='name'
                        onChange={onChange}
                    />
                    <EmailInput
                        placeholder="E-mail"
                        value={form.email}
                        name="email"
                        onChange={onChange}
                    />
                    <PasswordInput
                        placeholder="Пароль"
                        value={form.password}
                        name={"password"}
                        onChange={onChange}
                    />
                    <Button onClick={onClick} htmlType="button" type="primary" size="medium" style={{ width: 'min-content', alignSelf: 'center' }}>
                        Зарегистрироваться
                    </Button>
                </form>
                <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link></p>
            </div>
        </React.StrictMode>
    )
}

export default Register