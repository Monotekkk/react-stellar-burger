import React, {useContext, useState} from "react";
import style from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerConstructorContext} from "../../service/selectedIngridients";
import {postIngredients} from '../../utils/api'
import OrderDetails from "../orderDetails/orderDetails";

function BurgerConstructor({setVisible}) {
    const {constructorIngredients} = useContext(BurgerConstructorContext);
    const {modalContent, setModalContent} = useContext(BurgerConstructorContext);
    const onClick = () => {
        let idIngredients = [constructorIngredients.bun._id];
        constructorIngredients.ingredients.forEach((element) => {
            idIngredients.push(element._id);
        });
        idIngredients.push(constructorIngredients.bun._id);
        postIngredients(JSON.stringify({'ingredients': idIngredients})).then(result=> {
            setVisible();
            setModalContent(<OrderDetails data={result}/>);
        });
    }
    const calculateOrderAmount = (ingredients) => {
        if (ingredients.bun !== null) {
            const buns = ingredients.bun;
            const main = ingredients.ingredients;
            const priceMain = main.reduce(function (currentSum, currentNumber) {
                return currentSum + currentNumber.price;
            }, 0);
            return buns.price * 2 + priceMain;
        }
    }
    return (
        <section className={'mt-20 ml-10'}>
            {constructorIngredients.bun !== null ?
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
                : <p className={'text text_type_digits-default mt-30 mb-30'}>Выберите ингредиент бургера</p>
            }
            <div className={style.results}>
                <Button htmlType={"button"} type={"primary"} size={"medium"} extraClass={'ml-10'} onClick={onClick}>
                    Оформить заказ
                </Button>
                <CurrencyIcon className={'ml-2'} type={"primary"}/>
                <p className={'text text_type_digits-medium'}>{calculateOrderAmount(constructorIngredients) || 0}</p>
            </div>
        </section>


    )
}

export default BurgerConstructor;