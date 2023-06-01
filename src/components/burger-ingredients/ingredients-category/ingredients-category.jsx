import React from 'react';
import ingredientCategoryStyle from './ingredients-category.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientsCategory(props){
    return(
        <div>
            <h2 className='text text_type_main-medium'>
                {props.title}
            </h2>
            <div className={`${ingredientCategoryStyle.ingredientsWrapper} mt-6 mr-4 ml-4 mb-10`}>
                {props?.ingredientsFiltered && props.ingredientsFiltered.map(elem=>(
                    <div 
                        key={elem._id} 
                        className={`${ingredientCategoryStyle.ingredientWrapper}`} 
                    >
                        <div>
                            <img src={elem.image}/>
                        </div>
                        <div>
                            <div className={`text text_type_digits-default mt-1 mb-1 mr-1`}>{elem.price} </div>
                            <CurrencyIcon/>
                        </div>
                        <div className={`${ingredientCategoryStyle.title} text text_type_main-default`}>{elem.name}</div>
                        {
                            elem?.count &&
                            <Counter size="default" count={elem?.count}/>
                        } 
                    </div>
                ))}
            </div>
        </div>
    )
}