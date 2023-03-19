import styles from './Login.module.css';
import React, {useState} from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import {
    EmailInput,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../services/actions/auth';
import { getCookie } from '../utils/utility-function';

function Login()  {
    const [form, setValue] = useState({ email: '', password: '' });
    const dispatch = useDispatch()

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

    const onClick = e => {
        dispatch(postLogin(form))
    }

    return (
        <React.StrictMode>
            <AppHeader />
            <div className={styles.container}>
                <form className={styles.form}>
                    <h1 className={`${styles.heading} text text_type_main-medium`}>Вход</h1>

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
                        Войти
                    </Button>
                </form>
                <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>Вы - новый пользователь? <Link to='/register' className={styles.link}>Зарегестрироваться</Link></p>
                <p className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}>Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link></p>
            </div>
        </React.StrictMode>
    )
}

export default Login