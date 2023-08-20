import React, {useContext, useReducer} from "react";
import style from './burger-constructor.module.css';
import {
    ConstructorElement,
    DragIcon,
    Counter,
    Button,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes, {element} from "prop-types";
import {DataPropType} from '../../utils/prop-types';
import {SelectedIngridients} from "../../service/selectedIngridients";
import {TotalPrice} from "../../service/totalPriceContext";

function sumReducer(state, action) {
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

function BurgerConstructor({setVisible}) {
    const {selectedIngridientss, setSelectedIngridientss} = useContext(SelectedIngridients);
    const {totalPrice, countTotalPrice} = useContext(TotalPrice);
    const [state, dispatch] = useReducer(sumReducer, totalPrice);
    const onClick = () => {
        setVisible();
        dispatch({type: 'totalCount'});
    }

    let buns;
    selectedIngridientss.map(item => {
        if (item.type === 'bun') {
            buns = item;
        }
    })
    const main = selectedIngridientss.filter(data => data.type !== 'bun');
    console.log(state);
    return (
        <section className={'mt-20 ml-10'}>
            <ul
                className={`${style.ul} custom-scroll pr-2`}>
                {
                    <li className={`${style.burgerConstructorElements} pl-9`}>
                        <ConstructorElement
                            key={`${buns?._id + 1} ${0}`}
                            type="top"
                            isLocked={true}
                            text={`${buns?.name}(верх)`}
                            price={buns?.price}
                            thumbnail={buns?.image}
                        />
                    </li>
                }
                {
                    main.map((item, index) => {
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
                {
                    <li className={`${style.burgerConstructorElements} pl-9`}>
                        <ConstructorElement
                            key={`${buns?._id + 1} ${1}`}
                            type="bottom"
                            isLocked={true}
                            text={`${buns?.name}(низ)`}
                            price={buns?.price}
                            thumbnail={buns?.image}
                        />
                    </li>
                }
            </ul>
            <div className={style.results}>
                <Button htmlType={"button"} type={"primary"} size={"medium"} extraClass={'ml-10'} onClick={onClick}>
                    Оформить заказ
                </Button>
                <CurrencyIcon className={'ml-2'} type={"primary"}/>
                <p className={'text text_type_digits-medium'}>{state?.totalPrice}</p>
            </div>
        </section>
    )
}

export default BurgerConstructor;