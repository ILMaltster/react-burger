import { createAsyncThunk} from '@reduxjs/toolkit';
import getIngredients from '../../utils/api/getIngredients';


export const loadIngredients = createAsyncThunk(
    'allIngredients/loadIngredients',
    async (payload, thunkAPI)=>{
        try{
            return await getIngredients();
        }
        catch(error){
            thunkAPI.rejectWithValue(error.message)
        }
    }
)