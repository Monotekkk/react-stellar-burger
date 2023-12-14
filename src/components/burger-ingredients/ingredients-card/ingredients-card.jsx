import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {ADD_INGREDIENT, CHECK_VIEW_INGREDIENT} from '../../../service/actions';
import {useDrag} from 'react-dnd';
import style from './ingredients-card.module.css';
import {Link, useLocation} from "react-router-dom";

function BurgerCard({data}) {
    const dispatch = useDispatch();
    const location = useLocation();
    const selectedIngredients = useSelector(store => store.selectedIngredientsList.selectedIngredientsList);
    const clickHandler = (data) => {
        dispatch({type: CHECK_VIEW_INGREDIENT, data: data});
        dispatch({type: ADD_INGREDIENT, data: data,});
        setVisible(!visible);
    }
    const [counter, setCounter] = useState(0);
    const [visible, setVisible] = useState(false);
    const [{isDrag}, dragRef] = useDrag(
        {
            type: 'ingredients',
            item: data,
            collect: monitor => ({
                isDrag: monitor.isDragging()
            })
        });
    useEffect(()=>{
        setCounter(selectedIngredients.filter(item=>item._id===data._id).length);
    },[selectedIngredients.length]);

    return (
        <>
            {
                !isDrag &&
                <div className={style.card} onClick={() => clickHandler(data)} key={data._id} ref={dragRef}>
                    <Link
                        key={data._id}
                        to={`/ingredients/${data._id}`}
                        state={{background: location}}
                        className={style.link}
                    >
                        <img src={data.image} alt={data.name}/>
                        <div className={`${style.price} mb-2`}>
                            <p className={`mr-2 text text_type_main-default`}>{`${data.price}`}</p>
                            <CurrencyIcon type={"primary"}/>
                            {counter!==0&&<Counter count={data.type==='bun'?counter+1:counter} size="default" extraClass="m-1"/>}
                        </div>
                        <p className={`mr-2 mt-2 text text_type_main-default`}>{`${data.name}`}</p>
                    </Link>
                </div>

            }
        </>


    )
}

export default BurgerCard;