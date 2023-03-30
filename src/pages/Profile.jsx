import styles from './Profile.module.css';
import React, { useEffect, useState } from 'react'
import {
    EmailInput,
    PasswordInput,
    Input,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../utils/utility-function';
import { getProfile, patchProfile } from '../services/actions/profile';
import NavProfile from '../components/NavProfile/NavProfile';

function Profile() {
    const { user } = useSelector(state => state.profile)
    const [form, setValue] = useState({ name: user.name, email: user.email, password: '' });
    const [dis, setDis] = useState(true)
    const {logged} = useSelector(state => state.auth)
    const inputRef = React.useRef(null)
    const dispatch = useDispatch()
    const cookie = getCookie()

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onIconClick = e => {
        setDis(false)
        setTimeout(() => inputRef.current.focus(), 0)
    }

    const onClickCancel = e => {
        setValue({ name: user.name, email: user.email, password: '' })
    }

    const onSubmit = e => {
            e.preventDefault();
            
            dispatch(patchProfile(cookie, form))
        }

    useEffect(() => {
        if (cookie.accessToken) {
            dispatch(getProfile(cookie.accessToken))
        }
    }, [dispatch])

    useEffect(() => {
        setValue({ name: user.name, email: user.email, password: '' })
    }, [user])

    return (
        <div className={styles.container}>
            <NavProfile />
            <form className={styles.form} onSubmit={onSubmit}>
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
                    onBlur={() => { setDis(true) }}
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
                {(form.password != '' || form.email != user.email || form.name != user.name) && form.password != '' &&
                    <div style={{ display: 'flex', justifyContent: 'flex-end', maxHeight: 56 }}>
                        <Button onClick={onClickCancel} htmlType="reset" type="secondary" style={{ width: 'min-content', alignSelf: 'center' }}>
                            <p className={`text text_type_main-default`}>Отмена</p>
                        </Button>
                        <Button htmlType="submit" type="primary" size="medium" style={{ width: 'min-content', alignSelf: 'center' }}>
                            Сохранить
                        </Button>
                    </div>}
            </form>
        </div>
    )
}

export default Profile