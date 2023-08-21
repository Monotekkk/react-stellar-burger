import React, {useContext, useReducer} from "react";
import style from './burger-constructor.module.css';
import {
    ConstructorElement,
    DragIcon,
    Counter,
    Button,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerConstructorContext} from "../../service/selectedIngridients";


function BurgerConstructor({setVisible}) {
    const {constructorIngredients} = useContext(BurgerConstructorContext);
    const onClick = () =>{
        setVisible();
        calculateOrderAmount(constructorIngredients);
    }
    const calculateOrderAmount = (ingredients) =>{
        const buns = ingredients.bun;
        const main = ingredients.ingredients;
        console.log(main);
        const priceMain = main.map(function (value){
           return priceMain + value.price;
        });
        let sum =  buns.price * 2 + priceMain;
        console.log(sum);
    }
    return (
        <section className={'mt-20 ml-10'}>

            <ul
                className={`${style.ul} custom-scroll pr-2`}>
                <li className={`${style.burgerConstructorElements} pl-9`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${constructorIngredients.bun?.name}(верх)`}
                        price={constructorIngredients.bun?.price}
                        thumbnail={constructorIngredients.bun?.image}
                    />
                </li>
                {
                    constructorIngredients.ingredients.map((item, index) => {
                        return (
                            <li className={`${style.burgerConstructorElements}`}>
                                <DragIcon type={'secondary'}/>
                                <ConstructorElement
                                    key={`${item._id} ${index}`}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </li>
                        )
                    })
                }
                <li className={`${style.burgerConstructorElements} pl-9`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${constructorIngredients.bun?.name}(низ)`}
                        price={constructorIngredients.bun?.price}
                        thumbnail={constructorIngredients.bun?.image}
                    />
                </li>
            </ul>
            <div className={style.results}>
                <Button htmlType={"button"} type={"primary"} size={"medium"} extraClass={'ml-10'} onClick={onClick}>
                    Оформить заказ
                </Button>
                <CurrencyIcon className={'ml-2'} type={"primary"}/>
                <p className={'text text_type_digits-medium'}>{}</p>
            </div>
        </section>
    )
}

export default BurgerConstructor;