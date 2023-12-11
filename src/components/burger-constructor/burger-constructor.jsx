import React, {useMemo, useState, useCallback} from "react";
import style from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {postIngredients} from '../../utils/api'
import {useDispatch, useSelector} from "react-redux";
import {
    SET_ORDER,
    ADD_INGREDIENT,
    MOVE_INGREDIENT,
    POST_ORDER__PENDING,
    POST_ORDER__REJECT, POST_ORDER__SUCCESS
} from "../../service/actions";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDrop} from "react-dnd";
import ConstructorMain from "./burger-ingredients/burger-ingredients";
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from "react-router-dom";

function BurgerConstructor() {
    const store = useSelector(store => store.selectedIngredientsList.selectedIngredientsList);
    const [visible, setVisible] = useState(false);
    const [disable, setDisable] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user.user);
    const onClick = () => {
        if (user){
            if (store[0].type === 'bun') {
                let idIngredients = [store[0]._id];
                store.forEach((element) => {
                    idIngredients.push(element._id);
                });
                idIngredients.push(store[0]._id);
                postIngredients(JSON.stringify({'ingredients': idIngredients})).then(result => {
                    setVisible(true);
                    dispatch({type: SET_ORDER, data: result});
                    dispatch({type: POST_ORDER__PENDING});
                    if (result.ok) {
                        dispatch({type: POST_ORDER__SUCCESS});
                    }
                }).catch(err => {
                    dispatch({type: POST_ORDER__REJECT, data: err});
                })
            }
        }else {
            navigate('/login');
        }
    }
    const calculateOrderAmount = (store) => {
        store[0]?.type === 'bun' && setDisable(false);
        !store[1] && setDisable(true);
        if (store.length) {
            const buns = store[0];
            const main = store;
            const priceMain = main.reduce(function (currentSum, currentNumber) {
                return currentSum + currentNumber.price;
            }, 0);
            return buns.price + priceMain;
        }
    }
    const [, dropTargetMain] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            dispatch({type: ADD_INGREDIENT, data: {...item, key: uuidv4()}})
        }
    });
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch({type: MOVE_INGREDIENT, data: {dragIndex, hoverIndex}});
    }, [dispatch])
    const renderCard = useCallback(
        (item, index) => {
            return (
                item.type !== 'bun' && <ConstructorMain item={item} key={item.key} index={index} moveCard={moveCard}/>
            )
        },
        [moveCard]
    )
    return (
        <section className={'mt-20 ml-10'} ref={dropTargetMain}>
            {store.bun !== null ?
                <ul
                    className={`${style.ul} custom-scroll pr-2`}>

                    {
                        store.length > 0 && store[0]?.type === 'bun' ?
                            <li className={`${style.burgerConstructorElements} pl-9`} key={store[0]._id + 'up'}
                                index={0}>
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={`${store[0]?.name}(верх)`}
                                    price={store[0]?.price}
                                    thumbnail={store[0]?.image}
                                />
                            </li> : <div className={style.plug_top}>Перетащите булку</div>
                    }
                    {
                        (store[0]?.type !== 'bun' || store[1]?.type) && store.length > 0 ? store.map((item, index) => renderCard(item, index)) :
                            <div className={style.plug}>Перетащите соус или начинку</div>
                    }
                    {
                        store.length > 0 && store[0]?.type === 'bun' ?
                            <li className={`${style.burgerConstructorElements} pl-9`} key={store[0]._id + 'down'}
                                index={0}>
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={`${store[0]?.name}(низ)`}
                                    price={store[0]?.price}
                                    thumbnail={store[0]?.image}
                                />
                            </li> : <div className={style.plug_bottom}>Перетащите булку</div>
                    }
                </ul>
                : <p className={'text text_type_digits-default mt-30 mb-30'}>Выберите ингредиент бургера</p>
            }
            <div className={style.results}>
                <Button htmlType={"button"} type={"primary"} size={"medium"} extraClass={'ml-10'} onClick={onClick}
                        disabled={disable}>
                    Оформить заказ
                </Button>
                <CurrencyIcon className={'ml-2'} type={"primary"}/>
                <p className={'text text_type_digits-medium'}>{
                    useMemo(() => {
                        return calculateOrderAmount(store)
                    }, [store])
                    || 0
                }</p>
            </div>
            {
                visible && (
                    <Modal closePopup={() => setVisible(!visible)}>
                        <OrderDetails/>
                    </Modal>
                )
            }
        </section>


    )
}

export default BurgerConstructor;