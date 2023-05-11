import styles from './Login.module.css';
import React, { useState } from 'react'
import {
    EmailInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Navigate} from 'react-router-dom'
import { postEmail } from '../services/actions/password';
import { useDispatch, useSelector } from '../hooks/hooks';

function ForgotPassword()  {
    const [email, setValue] = useState('');
    const { emailSend } = useSelector(state => state.password)
    const dispatch = useDispatch()

    const onSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        dispatch(postEmail(email))
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
                    value={email}
                    onChange={e => setValue(e.target.value)}
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