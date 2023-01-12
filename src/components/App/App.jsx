import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstractor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import ModalOrder from '../ModalOrder/ModalOrder'
import ModalIngr from '../ModalIngr/ModalIngr'

export default function App()  {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
      })

    React.useEffect(() => {
        getFilms()
      }, [])
    
    const getFilms = async () => {
        setState({ ...state, hasError: false, isLoading: true });
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => res.json())
            .then(data => setState({ ...state, data, isLoading: false }))
            .catch(e => {
                setState({ ...state, hasError: true, isLoading: false });
            });
    };

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