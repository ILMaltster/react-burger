import React, {useState, useCallback} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from './ingredients-category/ingredients-category';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import Modal from '../common/modal-window/modal/modal';
import IngredientDetail from './ingredient-details/ingredient-details';

const BUN = "Булки"
const SAUCE = "Соусы"
const MAIN = "Начинки"

export default function BurgerIngredients({ingredients}){
    
    const [currentTab, setCurrentTab] = useState('one')
    const [selectedIngridient, setSelectedIngredient] = useState({});
    const [isNeedShow, setIsNeedShow] = useState(false);

    function selectIngridientAndOpenModal(ingredient){
        setSelectedIngredient(ingredient);
        setIsNeedShow(prev=>!prev);
    }

    const Categories = useCallback(()=>
        <>
            <IngredientsCategory 
                title={BUN} 
                ingredientsFiltered={ingredients?.filter && ingredients.filter(elem => elem.type === "bun")}
                selectIngridient={selectIngridientAndOpenModal}
            />
            <IngredientsCategory 
                title={SAUCE} 
                ingredientsFiltered={ingredients?.filter && ingredients?.filter(elem => elem.type === "sauce")}
                selectIngridient={selectIngridientAndOpenModal}
            />
            <IngredientsCategory 
                title={MAIN} 
                ingredientsFiltered={ingredients?.filter && ingredients?.filter(elem => elem.type === "main")}
                selectIngridient={selectIngridientAndOpenModal}
            />
        </>
    ,[ingredients])
    return(
        <div className='mt-10'>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="Булки" active={currentTab === 'one'} onClick={()=>setCurrentTab("one")}>
                    {BUN}
                </Tab>
                <Tab value="Соусы" active={currentTab === 'two'} onClick={()=>setCurrentTab("two")}>
                    {SAUCE}
                </Tab>
                <Tab value="Начинки" active={currentTab === 'three'} onClick={()=>setCurrentTab("three")}>
                    {MAIN}
                </Tab>
            </div>
            <div className={`${burgerIngredientsStyle.IngredientsCategoryWrapper} custom-scroll pt-10`}>
               <Categories/>
            </div>
            {
                isNeedShow &&
                <Modal title='Детали ингредиента' onClose={()=>setIsNeedShow(false)}>
                    <IngredientDetail ingredient={selectedIngridient}/>
                </Modal>   
            }
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