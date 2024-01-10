import style from './feed.module.css';
import {Link, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {WS_CONNECTION_START} from "../../service/actions/wsActionTypes";
import {getMessages, getWsConnected} from '../../service/selectors/wsSekectors'
import OrderCard from "../../components/order-card/order-card";
import styles from "../../components/app/app.module.css";

function Feed() {
    const dispatch = useDispatch();
    let messages = useSelector(getMessages);
    const connected = useSelector(getWsConnected);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(
        () => {
            messages = [];
            dispatch({type: WS_CONNECTION_START, payload: {status: false}});
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );
    useEffect(() => {
        connected && messages.length !== 0 && setIsLoading(true);
    }, [messages])
    return (
        isLoading ? <>
                <p className={`text text_type_main-large mb-5`}>Лента заказов</p>
                <div className={`${style.content}`}>
                    <div className={`${style.columnWithScroll} custom-scroll`}>
                        {
                            messages && messages.success && messages.orders.map((elem) => {
                                return <Link key={elem.number} className={style.ordersLink}
                                             to={`/feed/${elem.number}`}><OrderCard orders={elem}/></Link>
                            })
                        }
                    </div>
                    <div className={`${style.column}`}>
                        <div className={`${style.smallBlocks}`}>
                            <div className={`${style.smallBlock} custom-scroll`}>
                                <p className="text text_type_main-large custom-scroll">Готовы:</p>
                                <div className={style.ordersBlock}>
                                    {
                                        isLoading && messages.orders.some(elem => elem.status === 'done') ? messages.orders.map(elem => {
                                            if (elem.status === 'done') {
                                                return <p className={`${style.orders} text text_type_digits-default`}
                                                          key={elem.number}>{elem.number}</p>
                                            }
                                        }) : <p
                                            className={`text text_type_main-default text_color_inactive p-0`}>
                                            Заказов нет
                                        </p>
                                    }
                                </div>
                            </div>
                            <div className={`${style.smallBlock} custom-scroll`}>
                                <p className="text text_type_main-large">В работе:</p>
                                <div className={style.ordersBlock}>
                                    {
                                        isLoading && messages.orders.some(elem => elem.status !== 'done') ? messages.orders.map(elem => {
                                            if (elem.status !== 'done') {
                                                return <p className={`${style.orders} text text_type_digits-default`}
                                                          key={elem.number}>{elem.number}</p>
                                            }
                                        }) : <p
                                            className={`text text_type_main-default text_color_inactive p-0`}>
                                            Заказов нет
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={style.mediumBlock}>
                            <p className="text text_type_main-large">Выполнено за все время:</p>
                            <p className={`${style.orderNumber} text text_type_digits-large`}>{messages.total}</p>
                        </div>
                        <div className={style.mediumBlock}>
                            <p className="text text_type_main-large">Выполнено за сегодня:</p>
                            <p className="text text_type_digits-large">{messages.totalToday}</p>
                        </div>
                    </div>
                </div>
                <Outlet/>
            </> :
            <main className={styles.contentLoader}>
                <div className={styles.loader}></div>
            </main>
    )
}

export default Feed;