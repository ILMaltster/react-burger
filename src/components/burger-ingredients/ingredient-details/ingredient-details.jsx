import React from 'react';
import ingredientDetailStyle from './ingredient-detail.module.css';
import PropTypes from 'prop-types';

export default function IngredientDetail({ingredient}){
    return(
    <div className={ingredientDetailStyle.wrapper}>
        <img className={ingredientDetailStyle.image} src={ingredient.image_large}/>
        <div className={`${ingredientDetailStyle.name} mt-4 text text_type_main-medium`}>
            {ingredient.name}
        </div>
        <div className={`${ingredientDetailStyle.details} mt-8 text text_type_main-default text_color_inactive`}>
            <div>
                <div>Калории, ккал</div>
                <div className={`text text_type_digits-default`}>{ingredient.calories}</div>
            </div>
            <div>
                <div>Калории, ккал</div>
                <div className={`text text_type_digits-default`}>{ingredient.proteins}</div>
            </div>
            <div>
                <div>Жиры, г</div>
                <div className={`text text_type_digits-default`}>{ingredient.fat}</div>
            </div>
            <div>
                <div>Калории, ккал</div>
                <div className={`text text_type_digits-default`}>{ingredient.carbohydrates}</div>
            </div>
        </div>
    </div>
    )
}

IngredientDetail.propTypes = {
    ingredient: PropTypes.shape({
        _id : PropTypes.string.isRequired,
        name :PropTypes.string.isRequired,
        type :PropTypes.string.isRequired,
        proteins :PropTypes.number.isRequired,
        fat :PropTypes.number.isRequired,
        carbohydrates :PropTypes.number.isRequired,
        calories :PropTypes.number.isRequired,
        price :PropTypes.number.isRequired,
        image :PropTypes.string.isRequired,
        image_mobile :PropTypes.string.isRequired,
        image_large :PropTypes.string.isRequired,
        __v :PropTypes.number.isRequired
    })
}