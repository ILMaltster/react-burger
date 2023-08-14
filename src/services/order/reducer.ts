import {createSlice} from '@reduxjs/toolkit';
import {getOrderInfoByNumber, uploadOrderIngredients} from './action';
import {TOrderInitialState} from "../../utils/redux-types/data";

export const initialState: TOrderInitialState = {
    selectedOrder: null,
    order: null,
    isLoading: false,
    isNeedResetConstructor: false,
    error: ""
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers:{
        resetOrderDetails: (state)=>{
            state.order = null;
            state.isNeedResetConstructor = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(uploadOrderIngredients.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isNeedResetConstructor = true;
                state.order = action.payload;
            })
            .addCase(uploadOrderIngredients.pending, (state)=>{
                state.isLoading = true;
                state.error = "";
            })
            .addCase(uploadOrderIngredients.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getOrderInfoByNumber.fulfilled, (state, action)=>{
                state.selectedOrder = action.payload.orders;
            })
    }
})

export const {resetOrderDetails} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;