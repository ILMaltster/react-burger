import { createAsyncThunk} from '@reduxjs/toolkit';
import getIngredients from '../../utils/api/getIngredients';
import sendOrder from '../../utils/api/sendOrder';


export const uploadOrderIngredients = createAsyncThunk(
    'order/uploadOrderIngredients',
    async (payload, thunkAPI)=>{
        try{
            return await sendOrder(payload);
        }
        catch(error){
            thunkAPI.rejectWithValue(error.message)
        }
    }
)