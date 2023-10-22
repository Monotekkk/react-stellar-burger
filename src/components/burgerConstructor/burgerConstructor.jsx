import React, {useMemo, useState} from "react";
import style from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {postIngredients} from '../../utils/api'
import {useDispatch, useSelector } from "react-redux";
import { SET_ORDER } from "../../service/actions";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import { useDrop } from "react-dnd";
function BurgerConstructor() {
    const store = useSelector(store=>store.burgerConstructor.selectedIngridientsList);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const onClick = () => {
        let idIngredients = [store[0]._id];
        store.forEach((element) => {
            idIngredients.push(element._id);
        });
        idIngredients.push(store[0]._id);
        postIngredients(JSON.stringify({'ingredients': idIngredients})).then(result => {
            setVisible(true);
            dispatch({type: SET_ORDER, data: result});
        });
    }
    const calculateOrderAmount = (store) => {
        if (store.bun !== null) {
            const buns = store[0];
            const main = store;
            const priceMain = main.reduce(function (currentSum, currentNumber) {
                return currentSum + currentNumber.price;
            }, 0);
            return buns.price * 2 + priceMain;
        }
    }
    
    const [{ isHover }, dropTargetMain] = useDrop({
        accept: 'ingridienst',
        collect: monitor => ({
          isHover: monitor.isOver()
        }),
        drop(itemId){
            console.log(itemId);
        }
      });
    return (
        <section className={'mt-20 ml-10'} ref={dropTargetMain}>
            {store.bun !== null ?
                <ul
                    className={`${style.ul} custom-scroll pr-2`}>

                    <li className={`${style.burgerConstructorElements} pl-9`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${store[0].name}(верх)`}
                            price={store[0].price}
                            thumbnail={store[0].image}
                        />
                    </li>
                    {
                        store.map((item, index) => {
                            if(item.type !== 'bun'){
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
                            }
                        })
                    }
                    <li className={`${style.burgerConstructorElements} pl-9`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${store[0].name}(низ)`}
                            price={store[0].price}
                            thumbnail={store[0].image}
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