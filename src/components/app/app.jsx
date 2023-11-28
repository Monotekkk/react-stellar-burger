import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useState} from "react";
import Modal from "../modal/modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
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
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
                    </DndProvider>
            </main>
        </>
    );
}

export default App;
