import React, {useMemo, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from './ingredients-category/ingredients-category';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

const BUN = "Булки"
const SAUCE = "Соусы"
const MAIN = "Начинки"

export default function BurgerIngredients({ingredients}){
    const [current, setCurrent] = useState('one')
    const Categories = ()=> useMemo(()=>
        <>
            <IngredientsCategory title={BUN} ingredientsFiltered={ingredients.filter(elem => elem.type === "bun")}/>
            <IngredientsCategory title={SAUCE} ingredientsFiltered={ingredients.filter(elem => elem.type === "sauce")}/>
            <IngredientsCategory title={MAIN} ingredientsFiltered={ingredients.filter(elem => elem.type === "main")}/>
        </>
    
    ,[])
    return(
        <div className='mt-10'>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div className='' style={{ display: 'flex' }}>
                <Tab value="Булки" active={current === 'one'} onClick={setCurrent}>
                    {BUN}
                </Tab>
                <Tab value="Соусы" active={current === 'two'} onClick={setCurrent}>
                    {SAUCE}
                </Tab>
                <Tab value="Начинки" active={current === 'three'} onClick={setCurrent}>
                    {MAIN}
                </Tab>
            </div>
            <div className={`${burgerIngredientsStyle.IngredientsCategoryWrapper} custom-scroll pt-10`}>
               <Categories/>
            </div>
        </div>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(
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
    ).isRequired).isRequired
}