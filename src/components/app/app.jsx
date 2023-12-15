import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import {useEffect, useState} from "react";
import Modal from "../modal/modal";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import {useDispatch, useSelector} from "react-redux";
import {OnlyAuth, OnlyUnAuth} from "../../pages/ProtectedRouteElement";
import {checkUserAuth, refreshToken} from "../../utils/api";
import Profile from "../../pages/profile/profile";
import Orders from "../../pages/orders/orders";
import IngredientDetails from "../ingrindients-details/ingrendients-details";
import {loadIngredients} from "../../service/stores";

function App() {
    const [visible, ] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;
    const store = useSelector(store => store.user.user);
    const ingredients = useSelector(store => store.ingredientsList);
    useEffect(() => {
        dispatch(checkUserAuth());
        store && setTimeout(refreshToken(), 1200000);
        dispatch(loadIngredients());
    }, []);
    return (
        <>
            {visible && (
                <Modal closePopup={() => {
                    navigate(-1);
                }}/>
            )}
            <AppHeader/>
            {
                !ingredients.isLoadingIngredientsList && ingredients.ingredientsList.length > 0 ? (
                    <main className={styles.content}>
                        <DndProvider backend={HTML5Backend}>
                            <Routes location={background || location}>
                                <Route path={'/'} element={<Home/>}/>
                                <Route path={'/login'} element={<OnlyUnAuth component={<Login/>}/>}/>
                                <Route path={'/register'} element={<OnlyUnAuth component={<Register/>}/>}/>
                                <Route path={'/forgot-password'} element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
                                <Route path={'/reset-password'} element={<OnlyUnAuth component={<ResetPassword/>}/>}/>
                                <Route path={'/profile'} element={<OnlyAuth component={<Profile/>}/>}/>
                                <Route path={'/profile/orders'} element={<OnlyAuth component={<Orders/>}/>}/>
                                <Route path={'/ingredients/:id'} element={<IngredientDetails/>}/>
                            </Routes>
                            {background && (
                                <Routes>
                                    <Route
                                        path='/ingredients/:id'
                                        element={
                                            <Modal closePopup={() => {
                                                navigate(-1);
                                            }}>
                                                <IngredientDetails/>
                                            </Modal>
                                        }
                                    />
                                </Routes>
                            )}
                        </DndProvider>
                    </main>) : (
                    <p className="text text_type_main-large">
                        Страница загружается
                    </p>
                )
            }
        </>
    );
}

export default App;
