import React, {forwardRef, useEffect} from 'react';
import ingredientCategoryStyle from './ingredients-category.module.css'
import Ingredient from './ingredient/ingredient';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../utils/prop-types';
import { useNavigate, useLocation } from 'react-router-dom';

const IngredientsCategory = forwardRef((props, ref)=>{
    
    const navigate = useNavigate();
    const location = useLocation();
    return(
        <div ref={ref}>
            <h2 className='text text_type_main-medium'>
                {props.title}
            </h2>
            <div className={`${ingredientCategoryStyle.ingredientsWrapper} mt-6 mr-4 ml-4 mb-10`}>
                {props?.ingredientsFiltered && props.ingredientsFiltered.map(elem=>(
                    <Ingredient 
                        key={elem._id} 
                        data={elem} 
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

IngredientsCategory.propTypes ={
    ingredientsFiltered: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    title: PropTypes.string.isRequired,
    selectIngridient: PropTypes.func.isRequired
}