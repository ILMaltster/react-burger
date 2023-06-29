import {useState, useEffect, useRef} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import Modal from '../common/modal-window/modal/modal';
import IngredientDetail from './ingredient-details/ingredient-details';
import {BUNS, MAINS, SAUCE, INGREDIENT_TYPE_BUN, INGREDIENT_TYPE_MAIN, INGREDIENT_TYPE_SAUCE} from './../../utils/consts'
import {useDispatch, useSelector} from 'react-redux';
import IngredientsCategory from './ingredients-category/ingredients-category';
import { setCurrentIngredient } from '../../services/current-ingredient/reducer';

export default function BurgerIngredients(){
    const ingredients = useSelector(function GetIngredients(state){ 
        return state.allIngredients.data
    })

    const selectedIngredient = useSelector(function GetSelectedIngredient(store){
        return store.currentIngredient.ingredient
    })
    const dispatch = useDispatch();

    const [currentTab, setCurrentTab] = useState(INGREDIENT_TYPE_BUN)
    
    const [isNeedShow, setIsNeedShow] = useState(false);
    
    const bunRef = useRef();
    const mainRef = useRef();
    const souceRef = useRef();
    
    const categoryWrapperRef = useRef();

    useEffect(()=>{

        const setActiveTab = ()=>{
            const bunCoords = bunRef.current.getBoundingClientRect();
            const mainCoords = mainRef.current.getBoundingClientRect();
            const souceCoords = souceRef.current.getBoundingClientRect();
            const categoryWrapperCoords = categoryWrapperRef.current.getBoundingClientRect();

            const deltaBun = Math.abs(categoryWrapperCoords.top - bunCoords.top);
            const deltaMain = Math.abs(categoryWrapperCoords.top - mainCoords.top);
            const deltaSouce = Math.abs(categoryWrapperCoords.top - souceCoords.top);

            if(deltaBun < deltaMain && deltaBun < deltaSouce)
                setCurrentTab(INGREDIENT_TYPE_BUN);
            
            else if(deltaMain < deltaBun && deltaMain < deltaSouce)
                setCurrentTab(INGREDIENT_TYPE_MAIN);
            
            else setCurrentTab(INGREDIENT_TYPE_SAUCE);
        }
        
        categoryWrapperRef.current.addEventListener('scroll', setActiveTab);
        return ()=>{
            categoryWrapperRef.current?.removeEventListener('scroll', setActiveTab);
        }
        return;
    }, [])

    function selectIngridientAndOpenModal(ingredient){
        dispatch(setCurrentIngredient(ingredient));
        setIsNeedShow(prev=>!prev);
    }

    //НЕ РАБОТАЕТ НА ТЕКУЩИЙ МОМЕНТ
    function changeTab(selectedTab){
        if(selectedTab === INGREDIENT_TYPE_BUN) {
            categoryWrapperRef.current.scroll(0, categoryWrapperRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
            setCurrentTab(INGREDIENT_TYPE_BUN);
        }
        else if(selectedTab === INGREDIENT_TYPE_MAIN) {
            categoryWrapperRef.current.scrollBy(0, mainRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().height)
            setCurrentTab(INGREDIENT_TYPE_MAIN);
        }
        else if(selectedTab === INGREDIENT_TYPE_SAUCE) {
            categoryWrapperRef.current.scrollBy(0, souceRef.current.getBoundingClientRect().top - souceRef.current.getBoundingClientRect().height)
            setCurrentTab(INGREDIENT_TYPE_SAUCE);
        }
    }

    return(
        <div className='mt-10'>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab 
                    value={BUNS} 
                    active={currentTab === INGREDIENT_TYPE_BUN} 
                    onClick={()=>changeTab(INGREDIENT_TYPE_BUN)}
                >
                    {BUNS}
                </Tab>
                <Tab 
                    value={SAUCE} 
                    active={currentTab === INGREDIENT_TYPE_SAUCE} 
                    onClick={()=>changeTab(INGREDIENT_TYPE_SAUCE)}
                >
                    {SAUCE}
                </Tab>
                <Tab 
                    value={MAINS} 
                    active={currentTab === INGREDIENT_TYPE_MAIN} 
                    onClick={()=>changeTab(INGREDIENT_TYPE_MAIN)}
                >
                    {MAINS}
                </Tab>
            </div>
            <div 
                className={`${burgerIngredientsStyle.IngredientsCategoryWrapper} custom-scroll pt-10`}
                ref={categoryWrapperRef}
            >
               <>
                    <IngredientsCategory
                        ref={bunRef} 
                        title={BUNS} 
                        ingredientsFiltered={ingredients?.filter && ingredients.filter(elem => elem.type === INGREDIENT_TYPE_BUN)}
                        selectIngridient={selectIngridientAndOpenModal}
                    />
                    <IngredientsCategory
                        ref={souceRef}  
                        title={SAUCE} 
                        ingredientsFiltered={ingredients?.filter && ingredients?.filter(elem => elem.type === INGREDIENT_TYPE_SAUCE)}
                        selectIngridient={selectIngridientAndOpenModal}
                    />
                    <IngredientsCategory 
                        ref={mainRef} 
                        title={MAINS} 
                        ingredientsFiltered={ingredients?.filter && ingredients?.filter(elem => elem.type === INGREDIENT_TYPE_MAIN)}
                        selectIngridient={selectIngridientAndOpenModal}
                    />
                </>
            </div>
            {
                isNeedShow &&
                <Modal title='Детали ингредиента' onClose={()=>setIsNeedShow(false)} maxWidth='720px'>
                    <IngredientDetail ingredient={selectedIngredient}/>
                </Modal>   
            }
        </div>
    )
}