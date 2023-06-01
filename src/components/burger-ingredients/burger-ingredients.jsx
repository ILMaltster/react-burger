import React, {useMemo, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from './ingredients-category/ingredients-category';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import Modal from '../common/modal-window/modal/modal';

const BUN = "Булки"
const SAUCE = "Соусы"
const MAIN = "Начинки"

export default function BurgerIngredients({ingredients}){
    const [currentTab, setCurrentTab] = useState('one')
    const [selectedIngridient, setSelectedIngredient] = useState({});
    
    const Categories = ()=> useMemo(()=>
        <>
            <IngredientsCategory 
                title={BUN} 
                ingredientsFiltered={ingredients?.filter && ingredients.filter(elem => elem.type === "bun")}
                selectIngridient={setSelectedIngredient}
            />
            <IngredientsCategory 
                title={SAUCE} 
                ingredientsFiltered={ingredients?.filter && ingredients?.filter(elem => elem.type === "sauce")}
                selectIngridient={setSelectedIngredient}
            />
            <IngredientsCategory 
                title={MAIN} 
                ingredientsFiltered={ingredients?.filter && ingredients?.filter(elem => elem.type === "main")}
                selectIngridient={setSelectedIngredient}
            />
        </>
    
    ,[])
    return(
        <div className='mt-10'>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div className='' style={{ display: 'flex' }}>
                <Tab value="Булки" active={currentTab === 'one'} onClick={setCurrentTab}>
                    {BUN}
                </Tab>
                <Tab value="Соусы" active={currentTab === 'two'} onClick={setCurrentTab}>
                    {SAUCE}
                </Tab>
                <Tab value="Начинки" active={currentTab === 'three'} onClick={setCurrentTab}>
                    {MAIN}
                </Tab>
            </div>
            <div className={`${burgerIngredientsStyle.IngredientsCategoryWrapper} custom-scroll pt-10`}>
               <Categories/>
            </div>
            <Modal title='Детали ингредиента'>
                {selectedIngridient.name}
            </Modal>   
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