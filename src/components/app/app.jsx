import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-Ingredients/BurgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {getIngredients} from "../../utils/api";
import {useState, useEffect} from "react";
import Modal from "../modal/modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {

    const [ingredients, setIngredients] = useState([]);
    const [visible, setVisible] = useState(false);
    const [modalContent, setModalContent] = useState();

    useEffect(() => {
        getIngredients().then((result) => {
            setIngredients(result.data);
        })
    }, []);
    return (
        <>
            {visible && (
                <Modal closePopup={() => setVisible(!visible)}>
                    {
                        modalContent
                    }
                </Modal>
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
