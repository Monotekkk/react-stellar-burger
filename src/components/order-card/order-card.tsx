import style from './order-card.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation} from "react-router-dom";
import {useAppSelector} from "../../service/stores";
import {PropsWithChildren} from "react";
import {TIngredients, TOrders} from "../../service/types/data";

function OrderCard(props: PropsWithChildren<TOrders>) {
    const data = useAppSelector(store => store.ingredientsList.ingredientsList);
    const location = useLocation();
    const selectedIngredients:TIngredients[] = [];
    console.log(props);
    props.ingredients.forEach((elem: string[]) => {
        selectedIngredients.push(data?.find((item: { _id: string; }) => item._id === elem))
    })
    let orderDate = new Date(props.createdAt);
    let priceOrder = 0;
    return (
        <div className={style.card}>
            <div className={style.cardTitle}>
                <p className={`text text_type_digits-default`}>#{props.number}</p>
                <p className={`text text_type_main-default text_color_inactive`}>
                    <FormattedDate
                        date={new Date(orderDate.toISOString().split(' ')[0])}/>, i-GMT+3
                </p>
            </div>
            <p className={`text text_type_main-medium`}>{props.name}</p>
            {location.pathname === '/profile/orders' ? props.status === 'done' ?
                <p className={`${style.status_done} text_type_main-default`}>Выполнен</p> :
                <p className={`text text_type_main-default`}>Готовится</p> : <></>}
            <div className={`${style.ingredientsAndPriceBlock}`}>
                <div className={`${style.ingredientsBlock}`}>
                    {
                        selectedIngredients.map((elem, index) => {
                            priceOrder = priceOrder + elem?.price;
                            if (selectedIngredients.length > 6 && index === 5) {
                                return <div
                                    style={{
                                        backgroundImage: 'url(' + elem?.image_mobile + ')',
                                        zIndex: 1
                                    }}
                                    key={index}
                                    className={`${style.ingredientsImage} `}>
                                    <p className={`${style.ingredientsIndex} text text_type_digits-default`}>{selectedIngredients.length > 6 && `+${selectedIngredients.length - 5}`}</p>
                                </div>
                            } else if (index < 6) {
                                return <img key={index} alt={elem?.name} src={elem?.image_mobile}
                                            className={`${style.ingredientsImage}`}></img>
                            } else {
                                return null
                            }
                        })
                    }
                </div>
                {
                    priceOrder &&
                    <div className={`${style.priceBlock}`}>
                        <p className={`text text_type_digits-default`}>{priceOrder}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                }
            </div>
        </div>
    )
}

export default OrderCard