import ingredientStyle from './ingredient.module.css';
import {IIngredient, TConstructorIngredient} from "../../../utils/types";
import React from "react";

interface IngredientProps {
    ingredient: IIngredient | TConstructorIngredient;
    index?: number;
    slicedTotal?: number;
    total?: number;
}

export default function Ingredient({ingredient, index=0, slicedTotal=1, total=1}: IngredientProps): React.ReactElement{
    return(
        <div className={ingredientStyle.outer} style={{zIndex: slicedTotal - index}}>
            <div className={ingredientStyle.inner}>
                <img src={ingredient.image_mobile} alt=""/>
                {
                    index === slicedTotal - 1 && total > 6 &&
                    <div className={`${ingredientStyle.lastItemLayer} text text_type_digits-default`}>
                        +{total - slicedTotal}
                    </div>
                }
            </div>
        </div>
    )
}