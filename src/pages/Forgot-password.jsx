import styles from './Login.module.css';
import React, {useState} from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import {
    EmailInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useNavigate} from 'react-router-dom'
import { apiUrl, checkResponse } from '../utils/constants';

function ForgotPassword()  {
    const [form, setValue] = useState({ email: '' });
    const navigate = useNavigate()

    const onChange = e => {
        setValue({ ['email']: e.target.value });
      };

    const onSubmit = e => {
        fetch(`${apiUrl}password-reset`, {
            method: 'POST',
            body: JSON.stringify({
                "email": form.email
              }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res => {return checkResponse(res)})
        .then(data => {
            navigate('/reset-password', {state: data})
        })
        .catch(err => {
            console.log(`Ошибка: ${err}`)
        });
    }

    return (
        <React.StrictMode>
            <AppHeader />
            <div className={styles.container}>
                <form className={styles.form}>
                    <h1 className={`${styles.heading} text text_type_main-medium`}>Восстановление пароля</h1>

                    <EmailInput
                        placeholder="Укажите e-mail"
                        value={form.email}
                        onChange={onChange}
                    />
                    
                    <Button onClick={onSubmit} htmlType="button" type="primary" size="medium" style={{ width: 196, alignSelf: 'center' }}>
                        Восстановить
                    </Button>
                </form>
                <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
            </div>
        </React.StrictMode>
    )
}

export default ForgotPassword