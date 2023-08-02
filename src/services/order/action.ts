import { createAsyncThunk} from '@reduxjs/toolkit';
import sendOrder from '../../utils/api/sendOrder';
import getOrderInfo from "../../utils/api/getOrderInfo";


export const uploadOrderIngredients = createAsyncThunk(
    'order/uploadOrderIngredients',
    async (payload: string[], thunkAPI)=>{
        try{
            return await sendOrder(payload);
        }
        catch(error){
            thunkAPI.rejectWithValue(error)
        }
    }
)

export const getOrderInfoByNumber = createAsyncThunk(
    'order/getOrderInfoByNumber',
    async (payload: number, thunkAPI)=>{
        try{
            return await getOrderInfo(payload);
        }
        catch(error){
            thunkAPI.rejectWithValue(error)
        }
    }
)