import { configureStore } from '@reduxjs/toolkit';
import { allIngredientsReducer } from './all-ingredients/reducer';
import { constructorIngredientsReducer } from './constructor/reducer';

export const getStore = (initialState)=>{
    const store = configureStore({
        reducer:{
            allIngredients: allIngredientsReducer,
            constructorIngredients: constructorIngredientsReducer
        },
        preloadedState: initialState,
    })

    return store;
}