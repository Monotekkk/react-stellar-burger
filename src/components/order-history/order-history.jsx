import styles from "../app/app.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getMessages, getWsConnected} from "../../service/selectors/wsSekectors";
import {useEffect, useState} from "react";
import {WS_CONNECTION_START} from "../../service/actions/wsActionTypes";

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
    return (
        isLoading ?
            <>

            </>
            :
            <main className={styles.contentLoader}>
                <div className={styles.loader}></div>
            </main>
    )
}