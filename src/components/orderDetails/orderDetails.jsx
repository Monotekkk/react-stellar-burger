import styles from './orderDetails.module.css'
import img from '../../image/done.svg'
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

const OrderDetails = () => {
    const data = useSelector(state=>state.order.order);
    return (
        <section className={`${styles.section} pt-20 pb-30`} aria-label='Информация о заказе'>
            <p className={`${styles.number} text text_type_digits-large`}>{data.order.number}</p>
            <p className='text text_type_main-medium pt-8'>идентификатор заказа</p>
            <img className={`${styles.img} pt-15 pb-15`} src={img} alt="Статус заказа" />
            <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive pt-2'>Дождитесь готовности на орбитальной станции</p>
        </section>
    );
};
OrderDetails.propTypes = {
    data: PropTypes.object
}
export default OrderDetails;