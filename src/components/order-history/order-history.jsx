import {useDispatch, useSelector} from "react-redux";
import {getMessages, getWsConnected} from "../../service/selectors/wsSekectors";
import {useEffect, useState} from "react";
import OrderCard from "../order-card/order-card";
import style from "../../pages/feed/feed.module.css";
import {Link} from "react-router-dom";
import {connect as ordersConnect, disconnect as ordersDisconnect} from "../../service/actions/wsActionTypes";
import {Loader} from "../loader/loader";
const accessToken = localStorage.accessToken.split('Bearer ')[1];
const ordersServer = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
export default function OrderHistory() {
    const dispatch = useDispatch();
    const {status, orders} = useSelector((store) => store.wsReducer);
    const [isLoading, setLoading] = useState(false);
    const connect = () => dispatch(ordersConnect(ordersServer));
    const disconnect = () => dispatch(ordersDisconnect());
    useEffect(() => {
        connect();
        return () => {
            disconnect();
        };
    }, []);
    useEffect(() => {
        if (orders.orders) {
            setLoading(true);
        }
    }, [orders.orders]);
    return (
        <div className={`${style.ordersBlock} custom-scroll`}>
            {status === 'OPEN' && isLoading ?
                orders.orders && orders.success && orders.orders.map((elem) => {
                    return <Link key={elem.number} className={style.ordersLink}
                                 to={`/feed/${elem.number}`}><OrderCard orders={elem}/></Link>
                })
                :
                <Loader/>
            }
        </div>
    )
}