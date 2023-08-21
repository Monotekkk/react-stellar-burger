import styles from "./app.module.css";
import {data} from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-Ingredients/BurgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {getIngridients} from "../../utils/api";
import {useState, useEffect, useCallback, useContext, useReducer} from "react";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import {SelectedIngridients} from "../../service/selectedIngridients";
import {TotalPrice, totalPrice} from "../../service/totalPriceContext"
export function sumReducer(state, action) {
    switch (action.type) {
        case "totalCount":
            return {
                totalPrice: state.reduce(function (acc, elem) {
                    return acc + elem.price;
                }, 0)
            };
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}
function App() {
    const [ingredients, setIngredients] = useState([]);
    const [totalPrice, countTotalPrice] = useState({totalPrice: 0});
    const [selectedIngridientss, setSelectedIngridientss] = useState([]);
    const [visible, setVisible] = useState(false);
    const [state, dispatch] = useReducer(sumReducer, totalPrice);
    useEffect(() => {
        getIngridients().then((result) => {
            setIngredients(result.data);
        })
    }, []);
    return (
        <>
            <Modal visible={visible} closePopup={() => setVisible(!visible)}>
                <OrderDetails/>
            </Modal>
            <AppHeader/>
            <main className={styles.content}>
                <SelectedIngridients.Provider value={{selectedIngridientss, setSelectedIngridientss}}>
                    <TotalPrice.Provider value={{state, dispatch}}>
                        <BurgerIngredients data={ingredients}/>
                        <BurgerConstructor setVisible={() => setVisible(!visible)}/>
                    </TotalPrice.Provider>
                </SelectedIngridients.Provider>
            </main>
        </>
    );
}

export default App;
