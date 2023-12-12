import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import style from './ingredient.module.css'
import {loadIngridients} from "../../../service/stores";
import IngredientDetails from "../../../components/ingrindients-details/ingrendients-details";

function Ingredient() {
    const data = useSelector(state => state.ingredientsList.ingredientsList);
    const {id} = useParams();
    let ingredient = null;
    data.forEach(item => {
        if (item._id === id) {
            ingredient = item;
        }
    })
    return (

            <IngredientDetails/>
    )
}

export default Ingredient;