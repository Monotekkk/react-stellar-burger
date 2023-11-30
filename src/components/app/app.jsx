import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import {useEffect, useState} from "react";
import Modal from "../modal/modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {Routes, Route} from 'react-router-dom';
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import {useDispatch} from "react-redux";
import {checkUserAuth} from "../../service/actions";
function App() {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);
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
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
                    <Route path={'/reset-password'} element={<ResetPassword/>}/>
                </Routes>
                    </DndProvider>
            </main>
        </>
    );
}

export default App;
