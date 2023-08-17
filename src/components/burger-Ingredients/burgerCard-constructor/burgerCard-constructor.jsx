import {useContext, useState} from "react";
import style from './burgerCard-constructor.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../../ingrindientsDetails/ingrindientsDetails';
import React from "react";
import Modal from "../../modal/modal";
import {SelectedIngridients} from "../../../service/selectedIngridients";

function BurgerCard({data, setSelectedIngridients}) {
    const {selectedIngridientss, setSelectedIngridientss} = useContext(SelectedIngridients);

    const clickHandler = (data) => {
        setSelectedIngridients((prev) => [...prev, data]);
        let result;

        console.log(selectedIngridientss);
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
            <Modal visible={visible} closePopup={() => setVisible(!visible)}>
                <IngredientDetails data={data}/>
            </Modal>
        </>
    )
}

export default BurgerCard;