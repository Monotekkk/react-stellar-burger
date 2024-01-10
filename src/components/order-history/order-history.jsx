import styles from "../app/app.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getMessages, getWsConnected} from "../../service/selectors/wsSekectors";
import {useEffect, useState} from "react";
import {WS_CONNECTION_START} from "../../service/actions/wsActionTypes";
import OrderCard from "../order-card/order-card";
import style from "../../pages/feed/feed.module.css";
import {Link} from "react-router-dom";

export default function OrderHistory() {
    const dispatch = useDispatch();
    const messages = useSelector(getMessages);
    const connected = useSelector(getWsConnected);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(
        () => {
            dispatch({type: WS_CONNECTION_START, payload: {status: true}});
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );
    useEffect(() => {
        connected && messages.length !== 0 && setIsLoading(true);
    }, [messages])
    console.log(messages);
    return (
        isLoading ? <div className={`${style.columnWithScroll} custom-scroll`}>
                {
                    messages && messages.success && messages.orders.map((elem) => {
                        return <Link key={elem.number} className={style.ordersLink}
                                     to={`/feed/${elem.number}`}><OrderCard orders={elem}/></Link>
                    })
                }
            </div> :
            <main className={styles.contentLoader}>
                <div className={styles.loader}></div>
            </main>
    )
}