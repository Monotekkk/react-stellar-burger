import style from './burgerCard-constructor.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../../ingrindientsDetails/ingrindientsDetails';
import React, { useState } from "react";
import Modal from "../../modal/modal";
import { useDispatch } from 'react-redux';
import { ADD_INGRIDIENTS, CHECK_VIEWE_INGRIDIENTS } from '../../../service/actions';
import { useDrag } from 'react-dnd';
function BurgerCard({ data }) {
    const dispatch = useDispatch();
    const clickHandler = (data) => {
        dispatch({ type: CHECK_VIEWE_INGRIDIENTS, data: data });
        dispatch({ type: ADD_INGRIDIENTS, data: data });
        setVisible(!visible);
    }
    const [visible, setVisible] = useState(false);
    const [{ isDrag }, dragRef] = useDrag(
        {
            type: data.type,
            item: data._id,
            collect: monitor => ({
                isDrag: monitor.isDragging()
            })
        });
    return (
        <>
            {!isDrag &&
                <div className={style.card} onClick={() => clickHandler(data)} key={data._id} ref={dragRef}>
                    <img src={data.image} alt={data.name} />
                    <div className={`${style.price} mb-2`}>
                        <p className={`mr-2 text text_type_main-default`}>{`${data.price}`}</p>
                        <CurrencyIcon type={"primary"} />
                    </div>
                    <p className={`mr-2 mt-2 text text_type_main-default`}>{`${data.name}`}</p>
                </div>
                }
            {
                visible && (
                    <Modal closePopup={() => setVisible(!visible)}>
                        <IngredientDetails data={data} />
                    </Modal>
                )
            }
        
        </>
    )
}

export default BurgerCard;