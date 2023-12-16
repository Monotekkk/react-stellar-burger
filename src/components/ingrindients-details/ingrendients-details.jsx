import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css'
import {useLocation, useParams} from "react-router-dom";

const IngredientDetails = () => {
    const params = useParams();
    const data = useSelector(store=>store.ingredientsList.ingredientsList);
    let ingredient;
    data.forEach(elem=>{
        if(elem._id===params.id){
            ingredient = elem
        }
    })
    return (
        <section className={`${styles.section} pt-10 pb-15` } aria-label='Пищевая ценность'>
            <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <img className={styles.image} src={ingredient?.image} alt={ingredient?.name} />
            <p className={`text text_type_main-medium pt-4`}>{ingredient?.name}</p>

            <ul className={`${styles.container} pt-8`}>

                <li className={styles.li}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient?.calories}</p>
                </li>

                <li className={styles.li}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient?.proteins}</p>
                </li>

                <li className={styles.li}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient?.fat}</p>
                </li>

                <li className={styles.li}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient?.carbohydrates}</p>
                </li>

            </ul>

        </section>
    );
};

IngredientDetails.propTypes = {
    //data: DataPropType.isRequired
};

export default IngredientDetails;