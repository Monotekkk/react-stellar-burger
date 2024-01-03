import style from './order-history.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../app/app.module.css";

export default function OrderHistory() {

    return (
        loading ? <div className={style.orderBlock}>
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
                            const counterIngredients = (ingredients) => {
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