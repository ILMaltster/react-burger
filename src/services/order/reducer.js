import {createSlice} from '@reduxjs/toolkit';
import { uploadOrderIngredients } from './action';

const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: null,
        laoding: false,
        error: null
    },
    reducers:{
        resetOrderDetails: (state)=>{
            state.order = null;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(uploadOrderIngredients.fulfilled, (state,action)=>{
                state.laoding = false;
                state.order = action.payload;
            })
            .addCase(uploadOrderIngredients.pending, (state)=>{
                state.laoding = true;
                state.error = null;
            })
            .addCase(uploadOrderIngredients.rejected, (state, action)=>{
                state.laoding = false;
                state.error = action.payload;
            })
    }
})

export const {resetOrderDetails} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;