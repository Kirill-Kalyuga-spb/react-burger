import styles from './Home.module.css';
import BurgerConstractor from '../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function HomePage({data})  {

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                        <BurgerIngredients data={data} />
                        <BurgerConstractor />
                </main>
            </DndProvider>
        </div>
    )
}

export default HomePage