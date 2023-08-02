import React from 'react';
import ingredientDetailStyle from './ingredient-detail.module.css';
import {useParams} from 'react-router-dom';
import {IIngredient} from "../../../utils/types";
import {useAppSelector} from "../../../hooks/useAppSelector";

export default function IngredientDetail() : React.ReactElement{
    const {ingredientId} = useParams();

    const ingredients = useAppSelector(store=>store.allIngredients.data);
    const selectedIngredient = ingredients.find((elem: IIngredient) => elem._id === ingredientId);

    return selectedIngredient !== undefined ?(
        <div className={ingredientDetailStyle.wrapper}>
            <img className={ingredientDetailStyle.image} src={selectedIngredient.image_large} alt=""/>
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
    ) : <></>
}