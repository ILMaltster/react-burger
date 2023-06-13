import React, {useState, useCallback, useEffect} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from './ingredients-category/ingredients-category';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import Modal from '../common/modal-window/modal/modal';
import IngredientDetail from './ingredient-details/ingredient-details';
import {BUNS, MAINS, SAUCE, INGREDIENT_TYPE_BUN, INGREDIENT_TYPE_MAIN, INGREDIENT_TYPE_SAUCE} from './../../utils/consts'
import {useSelector} from 'react-redux';


export default function BurgerIngredients(){
    const ingredients = useSelector(state=>state.allIngredients.data)

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
                title={BUNS} 
                ingredientsFiltered={ingredients?.filter && ingredients.filter(elem => elem.type === INGREDIENT_TYPE_BUN)}
                selectIngridient={selectIngridientAndOpenModal}
            />
            <IngredientsCategory 
                title={SAUCE} 
                ingredientsFiltered={ingredients?.filter && ingredients?.filter(elem => elem.type === INGREDIENT_TYPE_SAUCE)}
                selectIngridient={selectIngridientAndOpenModal}
            />
            <IngredientsCategory 
                title={MAINS} 
                ingredientsFiltered={ingredients?.filter && ingredients?.filter(elem => elem.type === INGREDIENT_TYPE_MAIN)}
                selectIngridient={selectIngridientAndOpenModal}
            />
        </>
    ,[ingredients])
    
    return(
        <div className='mt-10'>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value={BUNS} active={currentTab === 'one'} onClick={()=>setCurrentTab("one")}>
                    {BUNS}
                </Tab>
                <Tab value={SAUCE} active={currentTab === 'two'} onClick={()=>setCurrentTab("two")}>
                    {SAUCE}
                </Tab>
                <Tab value={MAINS} active={currentTab === 'three'} onClick={()=>setCurrentTab("three")}>
                    {MAINS}
                </Tab>
            </div>
            <div className={`${burgerIngredientsStyle.IngredientsCategoryWrapper} custom-scroll pt-10`}>
               <Categories/>
            </div>
            {
                isNeedShow &&
                <Modal title='Детали ингредиента' onClose={()=>setIsNeedShow(false)} width='720px'>
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