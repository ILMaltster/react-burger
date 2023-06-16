import { createSlice } from '@reduxjs/toolkit';
import { INGREDIENT_TYPE_BUN } from '../../utils/consts';

const initialState = {
    mainIngredients: [],
    bun: null
}

const constructorSlice = createSlice({
    name: "constructorIngredients",
    initialState,
    reducers:{
        addIngredientToConstructor:(state, action)=>{
            let ingredient = action.payload.item;
            if(ingredient.type === INGREDIENT_TYPE_BUN){
                state.bun = ingredient;
            }
            else{
                state.mainIngredients.push({...ingredient, key: Math.random()});
            }
        },
        deleteIngredient:(state, action)=>{
            state.mainIngredients = state.mainIngredients.filter(elem=>elem.key !== action.payload.key)
        },
        swapIngredient:(state, action)=>{
            const dragId = state.mainIngredients.findIndex(x => x.key === action.payload.dragKey);
            const hoverId = state.mainIngredients.findIndex(x => x.key === action.payload.hoverKey);
            state.mainIngredients.splice(dragId, 0, state.mainIngredients.splice(hoverId,1)[0])
        },
        resetConstructor:()=>{
            return initialState;
        },
    }
})

export const {
    addIngredientToConstructor,
    deleteIngredient,
    resetConstructor,
    swapIngredient
} = constructorSlice.actions;


export const constructorIngredientsReducer = constructorSlice.reducer;