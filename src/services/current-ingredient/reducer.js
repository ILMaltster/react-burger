import { createSlice } from '@reduxjs/toolkit'

const currentIngredientSlice = createSlice({
    name: "currentIngredient",
    initialState:{
        ingredient: null
    },
    reducers:{
        setCurrentIngredient:(state, action)=>{
            state.ingredient = action.payload
        },
        resetCurrentIngredient:(state)=>{
            state.ingredient = null
        }
    }
})

export const {
    setCurrentIngredient, 
    resetCurrentIngredient
} = currentIngredientSlice.actions;

export const currentIngredientReducer = currentIngredientSlice.reducer;