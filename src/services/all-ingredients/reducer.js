import { createSlice } from '@reduxjs/toolkit'
import { loadIngredients } from './actions'

const allIngredientsSlice = createSlice({
    name: "allIngredients",
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    extraReducers: (builder)=>{
        builder
            .addCase(loadIngredients.fulfilled, (state, action)=>{
                state.data = action.payload
            })
            
    }
})

export const allIngredientsReducer = allIngredientsSlice.reducer;