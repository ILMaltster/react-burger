import ingredientStyle from './ingredient.module.css';
import {IIngredient} from "../../../utils/types";
import React from "react";

interface IngredientProps {
    ingredient: IIngredient;
    index: number;
    slicedTotal: number;
    total: number;
}

export default function Ingredient({ingredient, index, slicedTotal, total}: IngredientProps): React.ReactElement{
    return(
        <div className={ingredientStyle.outer} style={{zIndex: slicedTotal - index}}>
            <div className={ingredientStyle.inner}>
                <img src={ingredient.image_mobile} alt=""/>
                {
                    index === slicedTotal - 1 &&
                    <div className={`${ingredientStyle.lastItemLayer} text text_type_digits-default`}>
                        +{total - slicedTotal}
                    </div>
                }
            </div>
        </div>
    )
}