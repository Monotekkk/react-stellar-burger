import styles from './order-details.module.css'
import img from '../../image/done.svg'
import {Loader} from "../loader/loader";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../services/stores";

const OrderDetails = () => {
    const data = useAppSelector(state => state.order.orderInfo);
    const [number, setNumber] = useState(0);
    useEffect(()=>{
      const numberSet =  setTimeout(() => {
            setNumber(number+1)
        }, 1);
        return ()=>clearTimeout(numberSet);
    },[number])
    return (
        data.success !== 'loading' ?
            <section className={`${styles.section} pt-20 pb-30`} aria-label='Информация о заказе'>
                <p className={`${styles.number} text text_type_digits-large`}>{data.order.number}</p>
                <p className='text text_type_main-medium pt-8'>идентификатор заказа</p>
                <img className={`pt-15 pb-15`} src={img} alt="Статус заказа"/>
                <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive pt-2'>Дождитесь готовности на орбитальной
                    станции</p>
            </section>
            : <section className={`${styles.section} pt-20 pb-30`} aria-label='Информация о заказе'>
                <p className={`${styles.number} text text_type_digits-large`}>{number}</p>
                <p className='text text_type_main-medium pt-8'>Отправка заказа</p>
                <div className={`pt-15 pb-15`}><Loader/></div>
                <p className='text text_type_main-default'>Ваш заказ скоро начнут готовить</p>
                <p className='text text_type_main-default text_color_inactive pt-2'>Дождитесь готовности на орбитальной
                    станции</p>
            </section>
    );
};
export default OrderDetails;