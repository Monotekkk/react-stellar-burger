import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import OrderCard from "../order-card/order-card";
import style from "../../pages/feed/feed.module.css";
import {Link} from "react-router-dom";
import {connect as ordersConnect, disconnect as ordersDisconnect} from "../../service/actions/wsActionTypes";
import {Loader} from "../loader/loader";
import {getUser} from "../../service/selectors/wsSekectors";

export default function OrderHistory() {
    const dispatch = useDispatch();
    const {user} = useSelector(getUser);
    const {status, orders} = useSelector((store) => store.wsReducer);
    const [isLoading, setLoading] = useState(false);
    let accessToken = localStorage.accessToken.split('Bearer ')[1];
    const ordersServer = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
    const connect = () => dispatch(ordersConnect(ordersServer));
    const disconnect = () => dispatch(ordersDisconnect());
    useEffect(() => {
        user && connect();
        return () => {
            disconnect();
        };
    }, [user]);
    useEffect(() => {
        if (orders.orders) {
            setLoading(true);
        }
    }, [orders.orders]);
    return (
        <div className={`${style.ordersBlock} custom-scroll`}>
            {status === 'OPEN' ?
                orders.orders && orders.success && orders.orders.map((elem) => {
                    return <Link key={elem.number} className={style.ordersLink}
                                 to={`/feed/${elem.number}`}><OrderCard orders={elem}/></Link>
                })
                : status === 'Invalid or missing token' || status === 'CLOSE' ?
                    <>
                        <p className={`text text_type_main-large mb-5`}>Технические шоколадки</p>
                    </>
                    :
                    <Loader/>
            }
        </div>
    )
}