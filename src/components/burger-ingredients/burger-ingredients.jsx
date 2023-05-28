import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from './ingredients-category/ingredients-category';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

export default function BurgerIngredients({ingredients}){
    const [current, setCurrent] = useState('one')

    return(
        <div className='mt-10'>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div className='' style={{ display: 'flex' }}>
                <Tab value="Булки" active={current === 'one'} onClick={setCurrent}>
                Булки
                </Tab>
                <Tab value="Соусы" active={current === 'two'} onClick={setCurrent}>
                Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'three'} onClick={setCurrent}>
                Начинки
                </Tab>
            </div>
            <div className={`${burgerIngredientsStyle.IngredientsCategoryWrapper} custom-scroll pt-10`}>
                <IngredientsCategory title="Булки" ingredientsFiltered={ingredients.filter(elem => elem.type === "bun")}/>
                <IngredientsCategory title="Соусы" ingredientsFiltered={ingredients.filter(elem => elem.type === "sauce")}/>
                <IngredientsCategory title="Начинки" ingredientsFiltered={ingredients.filter(elem => elem.type === "main")}/>
            </div>
        </div>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf({
        "_id": PropTypes.string,
        "name":PropTypes.string,
        "type":PropTypes.string,
        "proteins":PropTypes.number,
        "fat":PropTypes.number,
        "carbohydrates":PropTypes.number,
        "calories":PropTypes.number,
        "price":PropTypes.number,
        "image":PropTypes.string,
        "image_mobile":PropTypes.string,
        "image_large":PropTypes.string,
        "__v":PropTypes.number
    }).isRequired
}