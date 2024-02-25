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
    POST_ORDER__REJECT, POST_ORDER__SUCCESS, CLEAR_CONSTRUCTOR
} from "../../services/constants";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDrop} from "react-dnd";
import ConstructorMain from "./burger-ingredients/burger-ingredients";
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../services/stores";
import {TIngredients} from "../../services/types/data";

function BurgerConstructor() {
    const {selectedIngredientsList} = useAppSelector((store) => store.selectedIngredientsList);
    const [visible, setVisible] = useState(false);
    const [disable, setDisable] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useAppSelector((store) => store.user);
    const onClick = () => {
        if (user) {
            if (selectedIngredientsList && selectedIngredientsList[0].type === 'bun') {
                let idIngredients = [];
                selectedIngredientsList.forEach((element: TIngredients) => {
                    idIngredients.push(element._id);
                });
                idIngredients.push(selectedIngredientsList[0]._id);
                dispatch({type: POST_ORDER__PENDING});
                setVisible(true);
                const ingredients:string = JSON.stringify({'ingredients': idIngredients});
                postIngredients(ingredients).then(result => {

                    dispatch({type: SET_ORDER, data: result});
                    if (result.success) {
                        dispatch({type: POST_ORDER__SUCCESS});
                        dispatch({type: CLEAR_CONSTRUCTOR});
                    }
                }).catch(err => {
                    dispatch({type: POST_ORDER__REJECT, data: err});
                })
            }
        } else {
            navigate('/login');
        }
    }
    const calculateOrderAmount = (store: Array<TIngredients>) => {
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
        drop(item:TIngredients) {
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
            {selectedIngredientsList &&
                <>
                    <ul className={`pr-2`}>

                        {
                            selectedIngredientsList.length > 0 && selectedIngredientsList[0]?.type === 'bun' ?
                                <li className={`${style.burgerConstructorElements} pl-9`}
                                    key={selectedIngredientsList[0]._id + 'up'}>
                                    <ConstructorElement
                                        type="top"
                                        isLocked={true}
                                        text={`${selectedIngredientsList[0]?.name}(верх)`}
                                        price={selectedIngredientsList[0]?.price}
                                        thumbnail={selectedIngredientsList[0]?.image}
                                    />
                                </li> : <div className={style.plug_top}>Перетащите булку</div>

                        }
                    </ul>
                    <ul className={`${style.ul} custom-scroll pr-2`}>
                        {
                            (selectedIngredientsList[0]?.type !== 'bun' || selectedIngredientsList[1]?.type) && selectedIngredientsList.length > 0 ? selectedIngredientsList.map((item:TIngredients, index:number) => renderCard(item, index)) :
                                <div className={style.plug}>Перетащите соус или начинку</div>
                        }
                    </ul>
                    <ul>
                        {
                            selectedIngredientsList.length > 0 && selectedIngredientsList[0]?.type === 'bun' ?
                                <li className={`${style.burgerConstructorElements} pl-9`}
                                    key={selectedIngredientsList[0]._id + 'down'}
                                >
                                    <ConstructorElement
                                        type="bottom"
                                        isLocked={true}
                                        text={`${selectedIngredientsList[0]?.name}(низ)`}
                                        price={selectedIngredientsList[0]?.price}
                                        thumbnail={selectedIngredientsList[0]?.image}
                                    />
                                </li> : <div className={style.plug_bottom}>Перетащите булку</div>
                        }
                    </ul>
                </>
            }
            <div className={style.results}>
                <Button htmlType={"button"} type={"primary"} size={"medium"} extraClass={'ml-10'} onClick={onClick}
                        disabled={disable}>
                    Оформить заказ
                </Button>
                <CurrencyIcon className={'ml-2'} type={"primary"}/>
                <p className={'text text_type_digits-medium'}>{
                    useMemo(() => {
                        return calculateOrderAmount(selectedIngredientsList!)
                    }, [selectedIngredientsList])
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