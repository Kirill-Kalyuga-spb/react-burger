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

function ResetPassword()  {
    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

    return (
        <React.StrictMode>
            <AppHeader />
            <div className={styles.container}>
                <form className={styles.form}>
                    <h1 className={`${styles.heading} text text_type_main-medium`}>Восстановление пароля</h1>
                    <PasswordInput
                        placeholder="Введите новый пароль"
                        value={form.password}
                        name={"password"}
                        onChange={onChange}
                    />
                    <Input
                        placeholder='Введите код из письма'
                        value={form.name}
                        name='name'
                        onChange={onChange}
                    />
                    <Button htmlType="submit" type="primary" size="medium" style={{ width: 167, alignSelf: 'center' }}>
                        Сохранить
                    </Button>
                </form>
                <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
            </div>
        </React.StrictMode>
    )
}

export default ResetPassword