import React from 'react';
import ingredientDetailStyle from './ingredient-detail.module.css'
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