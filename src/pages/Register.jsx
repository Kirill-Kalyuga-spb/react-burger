import styles from './Login.module.css';
import React, {useState} from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import {
    EmailInput,
    PasswordInput,
    Button,
    Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom'

function Register()  {
    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

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
                    <Button htmlType="submit" type="primary" size="medium" style={{ width: 253, alignSelf: 'center' }}>
                        Зарегистрироваться
                    </Button>
                </form>
                <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link></p>
            </div>
        </React.StrictMode>
    )
}

export default Register