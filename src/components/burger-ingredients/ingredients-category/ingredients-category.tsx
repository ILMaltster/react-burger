import React, {forwardRef} from 'react';
import ingredientCategoryStyle from './ingredients-category.module.css'
import Ingredient from './ingredient/ingredient';
import { useNavigate, useLocation } from 'react-router-dom';
import {TConstructorIngredient} from "../../../utils/types";

interface IIngredientsCategory {
    title: string;
    ingredientsFiltered: Array<TConstructorIngredient>;
}

const IngredientsCategory = forwardRef<HTMLDivElement, IIngredientsCategory>((props, ref)=>{
    const navigate = useNavigate();
    const location = useLocation();
    return(
        <div ref={ref} className={"pt-3"}>
            <h2 className='text text_type_main-medium'>
                {props.title}
            </h2>
            <div className={`${ingredientCategoryStyle.ingredientsWrapper} mt-6 mr-4 ml-4 mb-10`}>
                {props?.ingredientsFiltered && props.ingredientsFiltered.map((elem)=>(
                    <Ingredient
                        key={elem._id}
                        ingredient={elem}
                        onClick={()=>navigate(
                            `/ingredients/${elem._id}`,
                            {
                                state: {background: location}
                            }
                        )}
                    />
                ))}
            </div>
        </div>
    )
})
export default IngredientsCategory;