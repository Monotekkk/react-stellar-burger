import {useContext, useReducer, useState} from "react";
import style from './burgerCard-constructor.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../../ingrindientsDetails/ingrindientsDetails';
import React from "react";
import Modal from "../../modal/modal";
import {BurgerConstructorContext, SelectedIngridients} from "../../../service/selectedIngridients";

function BurgerCard({data}) {
    const {constructorIngredients, constructorDispatch} = useContext(BurgerConstructorContext);
    const clickHandler = (data) => {
        constructorDispatch({type: "ADD_INGREDIENT", payload: data});
        setVisible(!visible);
    }
    const [visible, setVisible] = useState(false);
    return (
        <>
            <div className={style.card} onClick={() => clickHandler(data)} key={data._id}>
                <img src={data.image} alt={data.name}/>
                <div className={`${style.price} mb-2`}>
                    <p className={`mr-2 text text_type_main-default`}>{`${data.price}`}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <p className={`mr-2 mt-2 text text_type_main-default`}>{`${data.name}`}</p>
            </div>
            {
                visible && (
                    <Modal closePopup={() => setVisible(!visible)}>
                        <IngredientDetails data={data}/>
                    </Modal>
                )
            }
        </>
    )
}

export default BurgerCard;