import React from 'react';
import ingredientCategoryStyle from './ingredients-category.module.css'
import Ingredient from './ingredient/ingredient';

export default function IngredientsCategory(props){
    return(
        <div>
            <h2 className='text text_type_main-medium'>
                {props.title}
            </h2>
            <div className={`${ingredientCategoryStyle.ingredientsWrapper} mt-6 mr-4 ml-4 mb-10`}>
                {props?.ingredientsFiltered && props.ingredientsFiltered.map(elem=>(
                    <Ingredient 
                        key={elem._id} 
                        data={elem} 
                        onClick={()=>props.selectIngridient(elem)}
                    />
                ))}
            </div>
        </div>
    )
}