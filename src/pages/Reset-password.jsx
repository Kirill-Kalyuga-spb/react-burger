import styles from './Login.module.css';
import React, {useState} from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import {
    PasswordInput,
    Button,
    Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useNavigate} from 'react-router-dom'
import { checkResponse, apiUrl } from '../utils/constants';

function ResetPassword()  {
    const [form, setValue] = useState({ code: '', password: '' });
    const navigate = useNavigate()

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };
  
    const onSubmit = e => {
        fetch(`${apiUrl}password-reset/reset`, {
            method: 'POST',
            body: JSON.stringify({
                "password": form.password,
                "token": ""
              }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res => { return checkResponse(res) })
            .then(data => {
                navigate('/login', { state: data })
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
                    <Button onClick={onSubmit} htmlType="button" type="primary" size="medium" style={{ width: 167, alignSelf: 'center' }}>
                        Сохранить
                    </Button>
                </form>
                <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
            </div>
        </React.StrictMode>
    )
}

export default ResetPassword