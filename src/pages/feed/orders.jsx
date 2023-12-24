import style from './orders.module.css';
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {WS_CONNECTION_START} from "../../service/actions/wsActionTypes";
import {getMessages, getWsConnected} from '../../service/selectors/wsSekectors'
import OrderCard from "../../components/order-card/order-card";

function Feed() {
    const dispatch = useDispatch();
    const messages = useSelector(getMessages);
    const connected = useSelector(getWsConnected);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(
        () => {
            dispatch({type: WS_CONNECTION_START});
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );
    useEffect(() => {
        connected && messages.length !== 0 && setIsLoading(true);
    }, [messages])

    return (
        <>
            <p className={`text text_type_main-large mb-5`}>Лента заказов</p>
            <div className={`${style.content}`}>
                <div className={`${style.columnWithScroll} custom-scroll`}>
                    {
                        messages && messages.success && messages.orders.map((elem) => {
                            return <OrderCard orders={elem} key={elem.number}/>
                        })
                    }
                </div>
                <div className={`${style.column}`}>
                    <div className={`${style.smallBlocks}`}>
                        <div className={`${style.smallBlock} custom-scroll`}>
                            <p className="text text_type_main-large custom-scroll">Готовы:</p>
                            <div className={style.ordersBlock}>
                                {
                                    isLoading && messages.orders.map(elem => {
                                        if (elem.status === 'done') {
                                            return <p className={`${style.orders} text text_type_digits-default`}
                                                      key={elem.number}>{elem.number}</p>
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div className={`${style.smallBlock}`}>
                            <p className="text text_type_main-large">В работе:</p>
                        </div>
                        <div className={`${style.smallBlocks}`}>

                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
        </>
    )
}

export default Feed;