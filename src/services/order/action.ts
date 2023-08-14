import { createAsyncThunk} from '@reduxjs/toolkit';
import sendOrder, {ISendOrderResponse} from '../../utils/api/sendOrder';
import getOrderInfo from "../../utils/api/getOrderInfo";
import {TRejectedData, TSelectedOrder} from "../../utils/types";


export const uploadOrderIngredients = createAsyncThunk<ISendOrderResponse, string[], TRejectedData>(
    'order/uploadOrderIngredients',
    async (payload )=>{
        return await sendOrder(payload);
    }
)

export const getOrderInfoByNumber = createAsyncThunk<TSelectedOrder, number, TRejectedData>(
    'order/getOrderInfoByNumber',
    async (payload)=>{
        return await getOrderInfo(payload);
    }
)