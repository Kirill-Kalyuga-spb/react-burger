import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstractor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/itemList';

function App()  {
    const dispatch = useDispatch()
    const {items} = useSelector(state => state.items)

    useEffect(() => {
        if (!items.length) {dispatch(getItems())}
      }, [dispatch])

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
            <AppHeader />
                <main className={styles.main}>
                        <BurgerIngredients data={items.data} />
                        <BurgerConstractor />
                </main>
            </DndProvider>
        </div>
    )
}

export default App