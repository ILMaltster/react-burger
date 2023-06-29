import { configureStore } from '@reduxjs/toolkit';
import { allIngredientsReducer } from './all-ingredients/reducer';
import { constructorIngredientsReducer } from './constructor/reducer';
import { currentIngredientReducer } from './current-ingredient/reducer';
import { orderReducer } from './order/reducer';
import { userReducer } from './user/reducer';

export const getStore = (initialState)=>{
    const store = configureStore({
        reducer:{
            allIngredients: allIngredientsReducer,
            constructorIngredients: constructorIngredientsReducer,
            currentIngredient: currentIngredientReducer,
            order: orderReducer,
            user: userReducer
        },
        preloadedState: initialState,
    })

    return store;
}