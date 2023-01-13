import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstractor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

export default function App()  {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
      })

    useEffect(() => {
        getIngredients()
      }, [])
    
    const getIngredients = async () => {
        setState({ ...state, hasError: false, isLoading: true });
        fetch('https://norma.nomoreparties.space/api/ingredients')
            // .then(res => res.json())
            .then(res => {return checkResponse(res)})
            .then(data => setState({ ...state, data, isLoading: false }))
            .catch(e => {
                setState({ ...state, hasError: true, isLoading: false });
            });
    };

    const checkResponse = (res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }


    const { data, isLoading, hasError } = state;

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients data={data.data} />
                <BurgerConstractor />
            </main>
            {/* <ModalOrder/> */}
            {/* <ModalIngr/> */}
        </>
    )
}