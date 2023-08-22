import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-Ingredients/BurgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {getIngredients} from "../../utils/api";
import {useState, useEffect, useCallback, useContext, useReducer} from "react";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import {BurgerConstructorContext} from "../../service/selectedIngridients";
import {IngredientsContext} from "../../service/ingredients";

export function constructorReducer(state, action) {
    switch (action.type) {
        case "ADD_INGREDIENT":
            if (action.payload.type === "bun") {
                return { ...state, bun: action.payload }
            } else {
                return { ...state, ingredients: [...state.ingredients, action.payload]}
            }
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

function App() {
    const [ingredients, setIngredients] = useState([]);
    const [visible, setVisible] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [constructorIngredients, constructorDispatch] = useReducer(constructorReducer, {
        bun: null,
        ingredients: []
    });

    useEffect(() => {
        getIngredients().then((result) => {
            setIngredients(result.data);
        })
    }, []);

    return (
        <>
            visible && <Modal closePopup={() => setVisible(!visible)}>
                {
                    modalContent
                }
            </Modal>
            <AppHeader/>
            <main className={styles.content}>
                <IngredientsContext.Provider value={{ingredients}}>
                    <BurgerConstructorContext.Provider value={{constructorIngredients, constructorDispatch, modalContent, setModalContent}}>
                        <BurgerIngredients />
                        <BurgerConstructor setVisible={() => setVisible(!visible)}/>
                    </BurgerConstructorContext.Provider>
                </IngredientsContext.Provider>
            </main>
        </>
    );
}

export default App;
