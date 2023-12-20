import style from './orders.module.css';
import {Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE} from "../../service/actions/wsActionTypes";
import ws from "../../utils/wsApi";


function Feed() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: WS_CONNECTION_SUCCESS});
    }, []);
    console.log(ws.onmessage)
    return (
        <>
            <div className={`${style.content}`}>
                <div className={`${style} custom-scroll`}>
                    <p className={`text text_type_main-large`}>Лента заказов</p>
                    {
                        ws.onmessage = function (event) {
                            event.data.map((elem)=>{
                                console.log(elem);
                                return (
                                    <div className={style.card}>
                                        <p className={`${style.cardP}`}></p>
                                    </div>
                                )
                            })
                        }
                    }
                </div>
                <div></div>
            </div>
            <Outlet/>
        </>
    )
}

export default Feed;