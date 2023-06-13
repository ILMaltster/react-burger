import React from 'react';
import ingredientsStyle from './ingredient.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, DragPreviewImage } from 'react-dnd'

export default function Ingredient({data, onClick}){
    
    const [{opacity, backgroundStyle}, ref, preview] = useDrag({
        type: 'ingredient',
        item: {id: data._id},
        collect: monitor=>({
            opacity: monitor.isDragging() ? "0.5" : 1,
            backgroundStyle: monitor.isDragging() ? 
                ingredientsStyle.draggIngredient : "",
            
        })
    })
    
    return(
        <>
            <DragPreviewImage connect={preview} src={data.image}/>
            <div
                ref={ref}
                className={`${ingredientsStyle.ingredientWrapper} ${backgroundStyle}`} 
                onClick={onClick}
            >
                <div>
                    <img src={data.image}/>
                </div>
                <div>
                    <div className={`text text_type_digits-default mt-1 mb-1 mr-1`}>{data.price} </div>
                    <CurrencyIcon/>
                </div>
                <div className={`${ingredientsStyle.title} text text_type_main-default`}>{data.name}</div>
                {
                    data?.count &&
                    <Counter size="default" count={data?.count}/>
                } 
            </div>
        </>
    )
}