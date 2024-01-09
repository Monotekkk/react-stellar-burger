import style from './order-card.module.css'
import {useSelector} from "react-redux";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

function OrderCard(orders, status) {
    const order = orders.orders;
    const ingredients = order.ingredients;
    const data = useSelector(store => store.ingredientsList.ingredientsList);
    const selectedIngredients = [];
    ingredients.forEach((elem) => {
        selectedIngredients.push(data.find(item => item._id === elem))
    })
    const orderDate = new Date(order.createdAt);
    let priceOrder = 0;
    return (
        <div className={style.card}>
            <div className={style.cardTitle}>
                <p className={`text text_type_digits-default`}>#{order.number}</p>
                <p className={`text text_type_main-default text_color_inactive`}>
                    <FormattedDate
                        date={new Date(orderDate)}/>, i-GMT+3
                </p>
            </div>
            <p className={`text text_type_main-medium`}>{order.name}</p>
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
                                    <p className={`${style.ingredientsIndex} text text_type_main-default`}>{selectedIngredients.length > 6 && `+${selectedIngredients.length - 5}`}</p>
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