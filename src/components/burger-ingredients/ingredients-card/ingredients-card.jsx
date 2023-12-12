import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../../ingrindients-details/ingrendients-details';
import React, {useState} from "react";
import Modal from "../../modal/modal";
import {useDispatch} from 'react-redux';
import {ADD_INGREDIENT, CHECK_VIEW_INGREDIENT} from '../../../service/actions';
import {useDrag} from 'react-dnd';
import style from './ingredients-card.module.css';
import {Link, useNavigate} from "react-router-dom";

function BurgerCard({data}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const clickHandler = (data) => {
        dispatch({type: CHECK_VIEW_INGREDIENT, data: data});
        dispatch({type: ADD_INGREDIENT, data: data,});
        setVisible(!visible);
        navigate(`/ingredients/${data._id}`);
    }
    const [visible, setVisible] = useState(false);
    const [{isDrag}, dragRef] = useDrag(
        {
            type: 'ingredients',
            item: data,
            collect: monitor => ({
                isDrag: monitor.isDragging()
            })
        });
    return (
        <>
            {!isDrag &&
                <div className={style.card} onClick={() => clickHandler(data)} key={data._id} ref={dragRef}>
                        <img src={data.image} alt={data.name}/>
                        <div className={`${style.price} mb-2`}>
                            <p className={`mr-2 text text_type_main-default`}>{`${data.price}`}</p>
                            <CurrencyIcon type={"primary"}/>
                        </div>
                        <p className={`mr-2 mt-2 text text_type_main-default`}>{`${data.name}`}</p>
                </div>
            }
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