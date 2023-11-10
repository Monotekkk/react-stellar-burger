import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css'

const IngredientDetails = () => {
    const data = useSelector(store=>store.ingredientsDetailModal.viewedIngridients);
    return (
        <section className={`${styles.section} pt-10 pb-15` } aria-label='Пищевая ценность'>

            <h2 className={`${styles.title} text text_type_main-large pl-10`}>Детали ингредиента</h2>
            <img className={styles.image} src={data.image} alt={data.name} />
            <p className={`text text_type_main-medium pt-4`}>{data.name}</p>

            <ul className={`${styles.container} pt-8`}>

                <li className={styles.li}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
                </li>

                <li className={styles.li}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
                </li>

                <li className={styles.li}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
                </li>

                <li className={styles.li}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
                </li>

            </ul>

        </section>
    );
};

IngredientDetails.propTypes = {
    //data: DataPropType.isRequired
};

export default IngredientDetails;