import React from 'react';
import ingredientDetailStyle from './ingredient-detail.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../utils/prop-types';
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';

export default function IngredientDetail(){

    const {ingredientId} = useParams();
    const ingredients = useSelector(store=>store.allIngredients.data);
    const selectedIngredient = ingredients.find(elem => elem._id === ingredientId);

    return selectedIngredient &&
    (
    <div className={ingredientDetailStyle.wrapper}>
        <img className={ingredientDetailStyle.image} src={selectedIngredient.image_large}/>
        <div className={`${ingredientDetailStyle.name} mt-4 text text_type_main-medium`}>
            {selectedIngredient.name}
        </div>
        <div className={`${ingredientDetailStyle.details} mt-8 text text_type_main-default text_color_inactive`}>
            <div>
                <div>Калории, ккал</div>
                <div className={`text text_type_digits-default`}>{selectedIngredient.calories}</div>
            </div>
            <div>
                <div>Калории, ккал</div>
                <div className={`text text_type_digits-default`}>{selectedIngredient.proteins}</div>
            </div>
            <div>
                <div>Жиры, г</div>
                <div className={`text text_type_digits-default`}>{selectedIngredient.fat}</div>
            </div>
            <div>
                <div>Калории, ккал</div>
                <div className={`text text_type_digits-default`}>{selectedIngredient.carbohydrates}</div>
            </div>
        </div>
    </div>
    )
}