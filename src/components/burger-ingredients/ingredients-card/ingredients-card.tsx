import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import {CHECK_VIEW_INGREDIENT} from '../../../services/constants';
import {useDrag} from 'react-dnd';
import style from './ingredients-card.module.css';
import {Link, useLocation} from "react-router-dom";
import {TIngredients} from "../../../services/types/data";
import {useAppSelector} from "../../../services/stores";

type TBurgerCard = {
    data: TIngredients,
    key: string
}
const BurgerCard: FC<PropsWithChildren<TBurgerCard>> = ({data}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const selectedIngredients: any = useAppSelector((store) => store.selectedIngredientsList.selectedIngredientsList);
    const clickHandler = (data: TIngredients) => {
        dispatch({type: CHECK_VIEW_INGREDIENT, data: data});
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
    useEffect(() => {
        setCounter(selectedIngredients.filter((item: { _id: string }) => item._id === data._id).length);
    }, [selectedIngredients]);

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
                            {counter !== 0 &&
                                <Counter count={data.type === 'bun' ? counter + 1 : counter} size="default"
                                         extraClass="m-1"/>}
                        </div>
                        <p className={`mr-2 mt-2 text text_type_main-default`}>{`${data.name}`}</p>
                    </Link>
                </div>

            }
        </>


    )
}

export default BurgerCard;