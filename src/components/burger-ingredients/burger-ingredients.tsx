import {useEffect, useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import {BUNS, INGREDIENT_TYPES, MAINS, SAUCE} from '../../utils/consts'
import IngredientsCategory from './ingredients-category/ingredients-category';
import {IIngredient} from "../../utils/types";
import {useAppSelector} from "../../hooks/useAppSelector";

export default function BurgerIngredients(){

    const ingredients = useAppSelector(function GetIngredients(state){
        return state.allIngredients.data
    })
    const [currentTab, setCurrentTab] = useState<INGREDIENT_TYPES>(INGREDIENT_TYPES.BUN)
    
    const bunRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    
    const categoryWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{

        const setActiveTab = ()=>{
            const bunCoords = bunRef.current!.getBoundingClientRect();
            const mainCoords = mainRef.current!.getBoundingClientRect();
            const sauceCoords = sauceRef.current!.getBoundingClientRect();
            const categoryWrapperCoords = categoryWrapperRef.current!.getBoundingClientRect();

            const deltaBun = Math.abs(categoryWrapperCoords.top - bunCoords.top);
            const deltaMain = Math.abs(categoryWrapperCoords.top - mainCoords.top);
            const deltaSauce = Math.abs(categoryWrapperCoords.top - sauceCoords.top);

            if(deltaBun < deltaMain && deltaBun < deltaSauce)
                setCurrentTab(INGREDIENT_TYPES.BUN);
            
            else if(deltaMain < deltaBun && deltaMain < deltaSauce)
                setCurrentTab(INGREDIENT_TYPES.MAIN);
            
            else setCurrentTab(INGREDIENT_TYPES.SAUCE);
        }
        
        categoryWrapperRef.current!.addEventListener('scroll', setActiveTab);
        return ()=>{
            categoryWrapperRef.current?.removeEventListener('scroll', setActiveTab);
        }
    }, [])

    function changeTab(selectedTab: INGREDIENT_TYPES){
        if(selectedTab === INGREDIENT_TYPES.BUN) {
            bunRef.current!.scrollIntoView({behavior: "smooth", block : "end"})
            setCurrentTab(INGREDIENT_TYPES.BUN);
        }
        else if(selectedTab === INGREDIENT_TYPES.SAUCE) {
            sauceRef.current!.scrollIntoView({behavior: "smooth", block : "end"});
            setCurrentTab(INGREDIENT_TYPES.SAUCE);
        }
        else if(selectedTab === INGREDIENT_TYPES.MAIN) {
            mainRef.current!.scrollIntoView({behavior: "smooth", block : "end"})
            setCurrentTab(INGREDIENT_TYPES.MAIN);
        }
    }

    return(
        <div className='mt-10'>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab 
                    value={BUNS} 
                    active={currentTab === INGREDIENT_TYPES.BUN}
                    onClick={()=>changeTab(INGREDIENT_TYPES.BUN)}
                >
                    {BUNS}
                </Tab>
                <Tab 
                    value={SAUCE} 
                    active={currentTab === INGREDIENT_TYPES.SAUCE}
                    onClick={()=>changeTab(INGREDIENT_TYPES.SAUCE)}
                >
                    {SAUCE}
                </Tab>
                <Tab 
                    value={MAINS} 
                    active={currentTab === INGREDIENT_TYPES.MAIN}
                    onClick={()=>changeTab(INGREDIENT_TYPES.MAIN)}
                >
                    {MAINS}
                </Tab>
            </div>
            <div 
                className={`${burgerIngredientsStyle.IngredientsCategoryWrapper} custom-scroll pt-5`}
                ref={categoryWrapperRef}
            >
               <>
                    <IngredientsCategory
                        ref={bunRef} 
                        title={BUNS} 
                        ingredientsFiltered={
                        ingredients?.filter && ingredients.filter(
                            (elem: IIngredient) => elem.type === INGREDIENT_TYPES.BUN)
                        }
                    />
                    <IngredientsCategory
                        ref={sauceRef}
                        title={SAUCE} 
                        ingredientsFiltered={ingredients?.filter && ingredients?.filter(
                            (elem: IIngredient) => elem.type === INGREDIENT_TYPES.SAUCE)
                        }
                    />
                    <IngredientsCategory 
                        ref={mainRef} 
                        title={MAINS} 
                        ingredientsFiltered={ingredients?.filter && ingredients?.filter(
                            (elem: IIngredient) => elem.type === INGREDIENT_TYPES.MAIN)
                        }
                    />
                </>
            </div>

        </div>
    )
}