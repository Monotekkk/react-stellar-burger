import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {
    connect as ordersConnect,
    disconnect as ordersDisconnect,
} from "../../services/actions/wsActionTypes";
import style from './feed__element.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getOrderThunk} from "../../services/actions/thunkAction";
import styles from "../app/app.module.css";
import {useAppSelector} from "../../services/stores";
import {TIngredients, TOrders} from "../../services/types/data";
const feedServer = 'wss://norma.nomoreparties.space/orders/all';
function FeedElement() {
    const {number} = useParams<string>();
    const dispatch = useDispatch();
    const [order, setOrder] = useState<TOrders>();
    const selectedData = useAppSelector(state => state.wsReducer.selectedMessage);
    const {status, orders} = useAppSelector((store) => store.wsReducer);
    const [isLoading, setLoading] = useState(false);
    const connect = () => dispatch(ordersConnect(feedServer));
    const disconnect = () => dispatch(ordersDisconnect());
    const setTotalPrice = (cost:number) => {
        return totalPrice = totalPrice + cost;
    }
    let totalPrice = 0;
    const isOrder = (order:TOrders) => {
        if (order.number === +number!) {
            setOrder(order);
        }
    }
    const ingredientsList = useAppSelector(store => store.ingredientsList.ingredientsList);
    let selectedIngredients: any[] = [];
    let orderedArray = []
    useEffect(
        () => {
            connect();
            return () => {
                disconnect();
            };
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );
    useEffect(() => {
        !orderedArray.length && dispatch(getOrderThunk(number))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderedArray.length])
    useEffect(() => {
        status === 'OPEN' && orders.orders.find(isOrder);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders.length]);
    useEffect(() => {
        if (selectedData && selectedData[0]) {
            setLoading(true);
        }
        setOrder(selectedData[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedData])
    if (isLoading && ingredientsList && order?.ingredients) {
        order.ingredients.forEach((elem, i) => {
            selectedIngredients.push(ingredientsList.find((item:TIngredients) => {
                return item._id === elem
            }))
        })
        orderedArray = selectedIngredients.filter(function (elem, index, self) {
            setTotalPrice(elem.price);
            return index === self.indexOf(elem);
        })
    }
    return (
       status === 'OPEN' && isLoading && order ? <div className={style.orderBlock}>
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
                <ul className={`${style.orderStructure} custom-scroll mr-10`}>
                    {
                        orderedArray.map((ingredient, index) => {
                            let count = 0;
                            const counterIngredients = (ingredients:TIngredients) => {
                                selectedIngredients.forEach(elem => {
                                    if (elem === ingredients) {
                                        count++;
                                    }
                                })
                                return count;
                            }
                            return <li className={`${style.orderStructureElement} mb-4`} key={index}>
                                <img className={style.orderImage} key={index} alt={ingredient.name}
                                     src={ingredient.image_mobile}></img>
                                <p className={`text text_type_main-small ${style.orderStructureName}`}>{ingredient.name}</p>
                                {
                                    <div className={style.orderStructureElement}>
                                        <p className={`text text_type_digits-default`}>{counterIngredients(ingredient) + ` x ` + ingredient.price}</p>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                }
                            </li>
                        })
                    }
                </ul>
                <div className={`${style.footerOrderEl} mt-10`}>
                    <p className={`text text_type_main-default text_color_inactive`}><FormattedDate
                        date={new Date(order.updatedAt)}/> i-GMT+3</p>
                    <div className={`${style.orderStructureElement}`}>
                        <p className={`text text_type_main-medium mr-2`}>{totalPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div> :
            <main className={styles.contentLoader}>
                <div className={styles.loader}></div>
            </main>
    )
}

export default FeedElement;