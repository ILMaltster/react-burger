import React from 'react';
import ingredientsStyle from './ingredient.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, DragPreviewImage } from 'react-dnd'
import {IIngredient} from "../../../../utils/types";

interface IIngredientProps{
    ingredient: IIngredient;
    onClick: () => void;
}

export default function Ingredient({ingredient, onClick}: IIngredientProps) : React.ReactElement{
    const [{backgroundStyle}, ref, preview] = useDrag<IIngredient, unknown, {backgroundStyle: string}>({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor)=>({
            backgroundStyle: monitor.isDragging() ?
                ingredientsStyle.draggIngredient : "",
            
        })
    })

    const img = new Image();
    img.src = ingredient.image;

    preview(img);
    
    return(
        <>
            <DragPreviewImage connect={preview} src={ingredient.image}/>
            <div
                ref={ref}
                className={`${ingredientsStyle.ingredientWrapper} ${backgroundStyle}`} 
                onClick={onClick}
            >
                <div>
                    <img src={ingredient.image} alt=""/>
                </div>
                <div>
                    <div className={`text text_type_digits-default mt-1 mb-1 mr-1`}>{ingredient.price} </div>
                    <CurrencyIcon type="primary"/>
                </div>
                <div className={`${ingredientsStyle.title} text text_type_main-default`}>{ingredient.name}</div>
                {
                    ingredient.countIngredient && ingredient.countIngredient > 0 &&
                    <div>
                        <Counter size="default" count={ingredient?.countIngredient}/>
                    </div>
                } 
            </div>
        </>
    )
}