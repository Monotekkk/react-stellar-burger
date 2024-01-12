import {useDispatch, useSelector} from "react-redux";
import {getMessages, getWsConnected} from "../../service/selectors/wsSekectors";
import {useEffect, useState} from "react";
import OrderCard from "../order-card/order-card";
import style from "../../pages/feed/feed.module.css";
import {Link} from "react-router-dom";

export default function OrderHistory() {
    const dispatch = useDispatch();
    let messages = useSelector(getMessages);
    const connected = useSelector(getWsConnected);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(
        () => {
            messages = [];
            dispatch({type: WS_CONNECTION_START, payload: {status: true}});
            return ()=>{
                dispatch({type: WS_CONNECTION_CLOSE});
            }
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );
    useEffect(() => {
        connected && messages.length !== 0 && setIsLoading(true);
    }, [messages])
    return (
        <div className={`${style.ordersBlock} custom-scroll`}>
            {isLoading ?
                    messages && messages.success && messages.orders.map((elem) => {
                    return <Link key={elem.number} className={style.ordersLink}
                                 to={`/feed/${elem.number}`}><OrderCard orders={elem}/></Link>
                })
             :
                <main className={style.contentLoader}>
            <div className={style.loader}></div>
        </main>
}
        </div>
    )
}