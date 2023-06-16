import React, {forwardRef, useEffect} from 'react';
import ingredientCategoryStyle from './ingredients-category.module.css'
import Ingredient from './ingredient/ingredient';
import PropTypes from 'prop-types';

const IngredientsCategory = forwardRef((props, ref)=>{
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
                        onClick={()=>props.selectIngridient(elem)}
                    />
                ))}
            </div>
        </div>
    )
})
export default IngredientsCategory;

IngredientsCategory.propTypes ={
    ingredientsFiltered: PropTypes.arrayOf(PropTypes.shape(
        {
            "_id": PropTypes.string.isRequired,
            "name":PropTypes.string.isRequired,
            "type":PropTypes.string.isRequired,
            "proteins":PropTypes.number.isRequired,
            "fat":PropTypes.number.isRequired,
            "carbohydrates":PropTypes.number.isRequired,
            "calories":PropTypes.number.isRequired,
            "price":PropTypes.number.isRequired,
            "image":PropTypes.string.isRequired,
            "image_mobile":PropTypes.string.isRequired,
            "image_large":PropTypes.string.isRequired,
            "__v":PropTypes.number.isRequired
        }
        ).isRequired).isRequired,
    title: PropTypes.string.isRequired,
    selectIngridient: PropTypes.func.isRequired
}