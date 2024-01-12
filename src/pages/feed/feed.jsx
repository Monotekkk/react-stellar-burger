import style from './feed.module.css';
import {Link, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import OrderCard from "../../components/order-card/order-card";
import styles from "../../components/app/app.module.css";
import {
    connect as ordersConnect, disconnect as ordersDisconnect
} from "../../service/actions/wsActionTypes";

const feedServer = 'wss://norma.nomoreparties.space/orders/all';

function Feed() {
    const dispatch = useDispatch();
    const {status, orders} = useSelector((store) => store.wsReducer);
    const [isLoading, setLoading] = useState(false);
    const connect = () => dispatch(ordersConnect(feedServer));
    const disconnect = () => dispatch(ordersDisconnect());
    useEffect(() => {
        connect();
        return () => {
            disconnect();
        };
    }, []);
    useEffect(() => {
        if (orders.orders && orders.orders.length === 50){
            setLoading(true);
        }
    }, [orders]);
    return (
        status === 'OPEN' && isLoading ?
            <>
                <p className={`text text_type_main-large mb-5`}>Лента заказов</p>
                <div className={`${style.content}`}>
                    <div className={`${style.columnWithScroll} custom-scroll`}>
                        {
                            orders.orders.map((elem) => {
                                return <Link key={elem.number} className={style.ordersLink}
                                             to={`/feed/${elem.number}`}><OrderCard orders={elem}/></Link>
                            })}
                    </div>
                    <div className={`${style.column}`}>
                        <div className={`${style.smallBlocks}`}>
                            <div className={`${style.smallBlock} custom-scroll`}>
                                <p className="text text_type_main-large custom-scroll">Готовы:</p>
                                <div className={style.ordersBlock}>
                                    {orders.orders.some(elem => elem.status === 'done') ? orders.orders.map(elem => {
                                        if (elem.status === 'done') {
                                            return <p className={`${style.orders} text text_type_digits-default`}
                                                      key={elem.number}>{elem.number}</p>
                                        }
                                    }) : <p
                                        className={`text text_type_main-default text_color_inactive p-0`}>
                                        Заказов нет
                                    </p>}
                                </div>
                            </div>
                            <div className={`${style.smallBlock} custom-scroll`}>
                                <p className="text text_type_main-large">В работе:</p>
                                <div className={style.ordersBlock}>
                                    {orders.orders.some(elem => elem.status !== 'done') ? orders.orders.map(elem => {
                                        if (elem.status !== 'done') {
                                            return <p className={`${style.orders} text text_type_digits-default`}
                                                      key={elem.number}>{elem.number}</p>
                                        }
                                    }) : <p
                                        className={`text text_type_main-default text_color_inactive p-0`}>
                                        Заказов нет
                                    </p>}
                                </div>
                            </div>
                        </div>
                        <div className={style.mediumBlock}>
                            <p className="text text_type_main-large">Выполнено за все время:</p>
                            <p className={`${style.orderNumber} text text_type_digits-large`}>{orders.total}</p>
                        </div>
                        <div className={style.mediumBlock}>
                            <p className="text text_type_main-large">Выполнено за сегодня:</p>
                            <p className="text text_type_digits-large">{orders.totalToday}</p>
                        </div>
                    </div>
                </div>
                <Outlet/>
            </> :

            <main className={styles.contentLoader}>
                <div className={styles.loader}></div>
            </main>)
}

export default Feed;