import styles from './Login.module.css';
import React, {useState} from 'react'
import {
    EmailInput,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom'
import { postLogin } from '../services/actions/auth';
import { useDispatch } from '../hooks/hooks';

function Login()  {
    const [form, setValue] = useState({ email: '', password: '' });
    const dispatch = useDispatch()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(postLogin(form))
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
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
                <Button htmlType="submit" type="primary" size="medium" style={{ width: 'min-content', alignSelf: 'center' }}>
                    Войти
                </Button>
            </form>
            <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>Вы - новый пользователь? <Link to='/register' className={styles.link}>Зарегестрироваться</Link></p>
            <p className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}>Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link></p>
        </div>
    )
}

export default Login