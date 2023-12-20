import style from './orders.module.css';
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {WS_CONNECTION_START} from "../../service/actions/wsActionTypes";
import {getUser} from '../../service/selectors/wsSekectors'

function Feed() {
    const dispatch = useDispatch();
    const {user} = useSelector(getUser);
    useEffect(
        () => {
            if (user) {
                dispatch({type: WS_CONNECTION_START});
            }
        },
        [user] // eslint-disable-line react-hooks/exhaustive-deps
    );
    return (
        <>
            <div className={`${style.content}`}>
                <div className={`${style} custom-scroll`}>
                    <p className={`text text_type_main-large`}>Лента заказов</p>
                    {

                    }
                </div>
                <div></div>
            </div>
            <Outlet/>
        </>
    )
}

export default Feed;