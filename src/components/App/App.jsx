import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstractor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

export default class App extends React.Component {
    render() {
        return (
            <>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients/>
                <BurgerConstractor/>
            </main>
            </>
        )
    }
}