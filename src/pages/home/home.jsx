import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {useState} from "react";
import style from './home-page.module.css';
function Home() {
    const {visible, setVisible}=useState();
    return (
        <div className={style.home}>
            <BurgerIngredients/>
            <BurgerConstructor setVisible={() => setVisible(!visible)}/>
        </div>
    )
}
export default Home;