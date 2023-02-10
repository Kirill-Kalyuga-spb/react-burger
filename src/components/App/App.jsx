import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstractor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App()  {
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
        <div>
            <DndProvider backend={HTML5Backend}>
            <AppHeader />
                <main className={styles.main}>
                        <BurgerIngredients data={data.data} />
                        <BurgerConstractor />
                </main>
            </DndProvider>
        </div>
    )
}

export default App