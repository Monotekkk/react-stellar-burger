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
import {checkUserAuth} from "../../utils/api";
import Profile from "../../pages/profile/profile";
import IngredientDetails from "../ingrindients-details/ingrendients-details";
import {loadIngredients, refreshTokenThunk} from "../../service/middleware";
import Feed from "../../pages/feed/feed";
import FeedElement from "../feed__element/feed__element";
import ProfileForm from "../profile-form/profile-form";
import OrderHistory from "../order-history/order-history";

function App() {
    const [visible,] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;
    const store = useSelector(store => store.user);
    const ingredients = useSelector(store => store.ingredientsList);
    useEffect(() => {
        dispatch(checkUserAuth());
        dispatch(loadIngredients());
        store.user && setInterval(refreshTokenThunk, 1200000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                <Route path={'/profile'} element={<OnlyAuth component={<Profile/>}/>}>
                                    <Route path={'/profile'}  element={<OnlyAuth component={<ProfileForm/>}/>}/>
                                    <Route path={'/profile/orders'} element={<OnlyAuth component={<OrderHistory/>}/>}/>
                                </Route>
                                <Route path={'/feed'} element={<Feed/>}/>
                                <Route path={'/feed/:number'} element={<FeedElement/>}/>
                                <Route path={'/ingredients/:id'} element={<IngredientDetails/>}/>
                                <Route path={'*'} element={<Home/>}/>
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
                    <main className={styles.contentLoader}>
                        <div className={styles.loader}></div>
                    </main>
                )
            }
        </>
    );
}

export default App;
