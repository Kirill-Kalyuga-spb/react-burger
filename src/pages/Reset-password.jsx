import styles from './Login.module.css';
import React, {useState} from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import {
    PasswordInput,
    Button,
    Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { postNewpassword } from '../services/actions/password';

function ResetPassword()  {
    const [form, setValue] = useState({ code: '', password: '' });
    const {passwordSend, emailSend} = useSelector(state => state.password)
    const dispatch = useDispatch()

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };
  
    const onSubmit = e => {
        e.preventDefault();
        dispatch(postNewpassword(form))
    }

    if (passwordSend || !emailSend) {
        return <Navigate to='/' replace />
    }

    return (
        <React.StrictMode>
            <AppHeader />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <h1 className={`${styles.heading} text text_type_main-medium`}>Восстановление пароля</h1>
                    <PasswordInput
                        placeholder="Введите новый пароль"
                        value={form.password}
                        name={"password"}
                        onChange={onChange}
                    />
                    <Input
                        placeholder='Введите код из письма'
                        value={form.code}
                        name='code'
                        onChange={onChange}
                    />
                    <Button htmlType="submit" type="primary" size="medium" style={{ width: 'min-content', alignSelf: 'center' }}>
                        Сохранить
                    </Button>
                </form>
                <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
            </div>
        </React.StrictMode>
    )
}

export default ResetPassword