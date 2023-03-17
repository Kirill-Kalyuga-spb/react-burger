import styles from './Profile.module.css';
import React, { useEffect, useState } from 'react'
import AppHeader from '../components/AppHeader/AppHeader';
import {
    EmailInput,
    PasswordInput,
    Input,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '../services/actions/auth';
import { getCookie } from '../utils/utility-function';
import { getProfile, patchProfile } from '../services/actions/profile';

function Profile()  {
    const {user} = useSelector(state => state.profile)
    const [form, setValue] = useState({ name: user.name, email: user.email, password: '' });
    const [dis, setDis] = useState(true)
    const auth = useSelector(state => state.auth) //ререндерит компонент после диспатча
    const inputRef = React.useRef(null)
    const dispatch = useDispatch()
    const cookie = getCookie()
    // const [cookie, setСookie] = useState(getCookie())

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

    const onIconClick = e => {
        setDis(false)
        setTimeout(() => inputRef.current.focus(), 0)
    }

    const onClickExit = e => {
        dispatch(postLogout(cookie.refreshToken))
        // setTimeout(() => setСookie(getCookie()), 1000)
    }

    const onClickCancel = e => {
        setValue({ name: user.name, email: user.email, password: '' })
    }

    const onClickSaveChange = e => {
        dispatch(patchProfile(cookie.accessToken, form))
    }

    useEffect(() => {
        if (cookie.accessToken) {
            dispatch(getProfile(cookie.accessToken))
        }
    }, [dispatch])

    useEffect(() => {
        setValue({ name: user.name, email: user.email, password: '' })
    }, [user])
    
    // if (!cookie.accessToken) {
    //     return <Navigate to={'/login'}/>
    // }

    return (
        <React.StrictMode>
            <AppHeader />
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><Link className={styles.link} to='/profile'><p className={`text_type_main-medium`}>Профиль</p></Link></li>
                        <li className={styles.listItem}><Link className={styles.link} to='/profile/orders'><p className={`text_type_main-medium text_color_inactive`}>История заказов</p></Link></li>
                        <li className={styles.listItem}>
                            <Button onClick={onClickExit} htmlType="button" type="secondary" extraClass={styles.link}>
                                <p className={`text_type_main-medium text_color_inactive`}>Выход</p>
                            </Button>
                        </li>
                    </ul>
                    <p className={`${styles.p} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
                </nav>
                <form className={styles.form}>
                    <Input
                        placeholder='Имя'
                        type={'text'}
                        value={user ? form.name : ''}
                        name='name'
                        onChange={onChange}
                        icon='EditIcon'
                        onIconClick={onIconClick}
                        ref={inputRef}
                        disabled={dis}
                        onBlur={() => {setDis(true)}}
                    />
                    <EmailInput
                        placeholder="Логин"
                        value={form.email}
                        name="email"
                        onChange={onChange}
                        isIcon={true}
                    />
                    <PasswordInput
                        placeholder="Пароль"
                        value={form.password}
                        name={"password"}
                        onChange={onChange}
                        icon="EditIcon"
                    />
                    {form.password != '' && (form.email != user.email || form.name != user.name) &&
                        <div style={{ display: 'flex', justifyContent: 'flex-end', maxHeight: 56 }}>
                            <Button onClick={onClickCancel} htmlType="reset" type="secondary" style={{ width: 'min-content', alignSelf: 'center' }}>
                                <p className={`text text_type_main-default`}>Отмена</p>
                            </Button>
                            <Button onClick={onClickSaveChange} htmlType="button" type="primary" size="medium" style={{ width: 'min-content', alignSelf: 'center' }}>
                                Сохранить
                            </Button>
                        </div>}
                </form>
            </div>
        </React.StrictMode>
    )
}

export default Profile