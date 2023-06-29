import React from 'react';
import ingredientsStyle from './ingredient.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, DragPreviewImage } from 'react-dnd'
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../../utils/prop-types';

export default function Ingredient({data, onClick}){

    const [{opacity, backgroundStyle}, ref, preview] = useDrag({
        type: 'ingredient',
        item: data,
        collect: monitor=>({
            opacity: monitor.isDragging() ? "0.5" : 1,
            backgroundStyle: monitor.isDragging() ? 
                ingredientsStyle.draggIngredient : "",
            
        })
    })

    const img = new Image();
    img.src = data.image;

    preview(img);
    
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
                    data.countIngredient > 0 &&
                    <div>
                        <Counter size="default" count={data?.countIngredient}/>
                    </div>
                } 
            </div>
        </>
    )
}

Ingredient.propTypes ={
    data: ingredientPropType.isRequired,
    onClick: PropTypes.func.isRequired
}