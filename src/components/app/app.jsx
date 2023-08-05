import styles from "./app.module.css";
import {data} from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-Ingredients/BurgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {getIngridients} from "../../utils/api";
import {useState, useEffect, useCallback} from "react";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";

function App() {
    const [selectedIngridients, setSelectedIngridients] = useState([
        {
            _id: "60666c42cc7b410027a1a9b1",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0,
        },
        {
            _id: "60666c42cc7b410027a1a9b5",
            name: "Говяжий метеорит (отбивная)",
            type: "main",
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: "https://code.s3.yandex.net/react/code/meat-04.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/meat-04-large.png",
            __v: 0,
        },
        {
            _id: "60666c42cc7b410027a1a9b6",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/meat-01-large.png",
            __v: 0,
        },
        {
            _id: "60666c42cc7b410027a1a9b7",
            name: "Соус Spicy-X",
            type: "sauce",
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            __v: 0,
        },
        {
            _id: "60666c42cc7b410027a1a9b9",
            name: "Соус традиционный галактический",
            type: "sauce",
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: "https://code.s3.yandex.net/react/code/sauce-03.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            __v: 0,
        },
        {
            _id: "60666c42cc7b410027a1a9b4",
            name: "Мясо бессмертных моллюсков Protostomia",
            type: "main",
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/meat-02-large.png",
            __v: 0,
        },
        {
            _id: "60666c42cc7b410027a1a9b6",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/meat-01-large.png",
            __v: 0,
        },
    ]);
    const [ingredients, setIngredients] = useState([]);

    const [visible, setVisible] = useState(false);
    useEffect(() => {
        getIngridients().then((result)=>{
            setIngredients(result.data);
        })
    }, []);
    return (
        <>
            <Modal visible={visible} closePopup={ () => setVisible(!visible) }>
                <OrderDetails/>
            </Modal>
            <AppHeader/>
            <main className={styles.content}>
                <BurgerIngredients data={ingredients} setSelectedIngridients={setSelectedIngridients}/>
                <BurgerConstructor data={selectedIngridients} setVisible={ () => setVisible(!visible) }/>
            </main>
        </>
    );
}

export default App;
