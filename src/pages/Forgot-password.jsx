import styles from './Login.module.css';
import React, { useState } from 'react'
import {
    EmailInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { postEmail } from '../services/actions/password';

function ForgotPassword()  {
    const [form, setValue] = useState({ email: '' });
    const { emailSend } = useSelector(state => state.password)
    const dispatch = useDispatch()

    const onChange = e => {
        setValue({ ['email']: e.target.value });
      };

    const onSubmit = e => {
        e.preventDefault();
        dispatch(postEmail(form.email))
    }

    if (emailSend) {
        return <Navigate to='/reset-password' />
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={`${styles.heading} text text_type_main-medium`}>Восстановление пароля</h1>

                <EmailInput
                    placeholder="Укажите e-mail"
                    value={form.email}
                    onChange={onChange}
                />

                <Button htmlType="submit" type="primary" size="medium" style={{ width: 'min-content', alignSelf: 'center' }}>
                    Восстановить
                </Button>
            </form>
            <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
        </div>
    )
}

export default ForgotPassword