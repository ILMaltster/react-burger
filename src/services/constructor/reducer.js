import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mainIngredients: [],
    bun: null
}

const constructorSlice = createSlice({
    name: "constructorIngredients",
    initialState,
    reducers:{
        addIngredient:(state, action)=>{
            console.log(state, action);
        },
        deleteIngredient:(state, action)=>{
            console.log("test");
        },
        resetConstructor:()=>{
            return initialState;
        },
    }
})

export const {
    addIngredient,
    deleteIngredient,
    resetConstructor
} = constructorSlice.actions;


export const constructorIngredientsReducer = constructorSlice.reducer;