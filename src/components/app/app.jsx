import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-Ingredients/BurgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {useState} from "react";
import Modal from "../modal/modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
    const [visible, setVisible] = useState(false);
    return (
        <>
            {visible && (
                <Modal closePopup={() => setVisible(!visible)}/>
            )}
            <AppHeader/>
            <main className={styles.content}>
            <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor setVisible={() => setVisible(!visible)}/>
                    </DndProvider>
            </main>
        </>
    );
}

export default App;
