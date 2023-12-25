import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMessages, getWsConnected} from "../../../service/selectors/wsSekectors";
import {useEffect, useState} from "react";
import {WS_CONNECTION_START} from "../../../service/actions/wsActionTypes";
import style from './feed__element.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function FeedElement() {
    const param = useParams();
    const data = useSelector(getMessages);
    const dispatch = useDispatch();
    const connected = useSelector(getWsConnected);
    const [order, setOrder] = useState({});
    const isOrder = (order) => {
        if (order.number === +param.number) {
            setOrder(order);
        }

    }
    const ingredientsList = useSelector(store => store.ingredientsList.ingredientsList);
    let selectedIngredients = [];
    let count = 0;
    useEffect(
        () => {
            !connected && dispatch({type: WS_CONNECTION_START});
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );
    useEffect(() => {
        connected && data.orders.find(isOrder);
    }, [data]);
    if (ingredientsList && order.ingredients) {
        order.ingredients.forEach((elem, i) => {
            selectedIngredients.push(ingredientsList.find((item, i) => item._id === elem))
        })
        selectedIngredients = selectedIngredients.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        })

    }
    return (
        <div className={style.orderBlock}>
            <p className="text text_type_digits-default mb-10">
                #{order.number}
            </p>
            <p className="text text_type_main-medium mb-3">
                {order.name}
            </p>

            <p className={`text text_type_main-medium mb-15 ${style.orderStatus} ${style.orderTextLeft}`}>
                {order.status === 'done' ? 'Выполнен' : 'В работе'}
            </p>

            <p className={`${style.orderTextLeft} text text_type_main-medium mb-3`}>
                Состав:
            </p>
            <ul className={style.orderStructure}>
                {
                    selectedIngredients.map((ingredient, index) => {
                        return <li className={style.orderStructureElement} key={index}>
                            <img key={index} alt={ingredient.name} src={ingredient.image_mobile}></img>
                            <p className={`text text_type_main-small ${style.orderStructureName}`}>{ingredient.name}</p>
                            {
                                <div className={style.orderStructureElement}>
                                    <p className={`text text_type_main-medium`}>{count !== 0 && count + `x` + ingredient.price}</p>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            }
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default FeedElement;