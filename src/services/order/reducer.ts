import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getOrderInfoByNumber, uploadOrderIngredients} from './action';
import {TOrderInitialState} from "../../utils/redux-types/data";
import {ISendOrderResponse} from "../../utils/api/sendOrder";
import {TSelectedOrder} from "../../utils/types";

const initialState: TOrderInitialState = {
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
    extraReducers:{
        [uploadOrderIngredients.fulfilled.type]: (state, action: PayloadAction<ISendOrderResponse>)=>{
            state.isLoading = false;
            state.isNeedResetConstructor = true;
            console.log(action.payload);
            state.order = action.payload;
        },
        [uploadOrderIngredients.pending.type]: (state)=>{
            state.isLoading = true;
            state.error = "";
        },
        [uploadOrderIngredients.rejected.type]: (state, action: PayloadAction<string>)=>{
            state.isLoading = false;
            state.error = action.payload;
        },
        [getOrderInfoByNumber.fulfilled.type]: (state, action: PayloadAction<TSelectedOrder>)=>{
            state.selectedOrder = action.payload.orders;
        }
    }
})

export const {resetOrderDetails} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;