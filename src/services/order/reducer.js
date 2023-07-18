import {createSlice} from '@reduxjs/toolkit';
import { uploadOrderIngredients } from './action';

const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: null,
        isLoading: false,
        isNeedResetConstructor: false,
        error: null
    },
    reducers:{
        resetOrderDetails: (state)=>{
            state.order = null;
            state.isNeedResetConstructor = false;
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(uploadOrderIngredients.fulfilled, (state,action)=>{
                state.isLoading = false;
                state.isNeedResetConstructor = true;
                state.order = action.payload;
            })
            .addCase(uploadOrderIngredients.pending, (state)=>{
                state.isLoading = true;
                state.error = null;
            })
            .addCase(uploadOrderIngredients.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const {resetOrderDetails} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;