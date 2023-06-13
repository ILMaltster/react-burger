import React from 'react';
import plugIngredient from './plug-ingredient.module.css';

export default function PlugIngredient({text}){
    return(
        <div className={`${plugIngredient.wrapper}`}>
            <div>
                {text}
            </div>
        </div>
    )
}