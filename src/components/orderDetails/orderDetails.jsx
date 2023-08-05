import styles from './orderDetails.module.css'
import img from '../../image/done.svg'

const OrderDetails = () => {
    return (
        <section className={`${styles.section} pt-20 pb-30`} aria-label='Информация о заказе'>
            <p className={`${styles.number} text text_type_digits-large`}>034536</p>
            <p className='text text_type_main-medium pt-8'>идентификатор заказа</p>
            <img className={`${styles.img} pt-15 pb-15`} src={img} alt="Статус заказа" />
            <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive pt-2'>Дождитесь готовности на орбитальной станции</p>
        </section>
    );
};

export default OrderDetails;