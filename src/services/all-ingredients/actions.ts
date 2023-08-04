import {createAsyncThunk} from '@reduxjs/toolkit';
import getIngredients from '../../utils/api/getIngredients';
import {IIngredient, TRejectedData} from "../../utils/types";

export const loadIngredients = createAsyncThunk<IIngredient[], void, TRejectedData>(
    'allIngredients/loadIngredients',
    async ()=>{
            return await getIngredients();
    }
)