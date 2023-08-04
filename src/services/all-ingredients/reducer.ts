import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { loadIngredients } from './actions'
import { INGREDIENT_TYPE_BUN } from '../../utils/consts';
import {TAllIngredientsInitialState} from "../../utils/redux-types/data";
import {TConstructorIngredient} from "../../utils/types";

const initialState: TAllIngredientsInitialState = {
    data: [],
    isLoading: false,
    error: ""
}

const allIngredientsSlice = createSlice({
    name: "allIngredients",
    initialState,
    reducers:{
        increaseItemCount: (state, action: PayloadAction<string>)=>{
            state.data = state.data.map(elem=>{
                if(elem._id === action.payload){
                    elem.countIngredient++
                    if(elem.type === INGREDIENT_TYPE_BUN)
                        elem.countIngredient++
                }
                
                return elem;
            })
        },
        decreaseItemCount: (state, action: PayloadAction<string>)=>{
            state.data = state.data.map(elem=>{
                if(elem._id === action.payload){
                    elem.countIngredient--
                    if(elem.type === INGREDIENT_TYPE_BUN)
                        elem.countIngredient--
                }
                
                return elem;
            })
        },
        resetItemCount:(state)=>{
            state.data = state.data.map(elem=>{
                elem.countIngredient = 0
                return elem;
            })
        }        
    },
    extraReducers: builder=>{
        builder
            .addCase(loadIngredients.fulfilled, (state, action)=>{
                state.data = action.payload.map<TConstructorIngredient>(elem =>{
                    (elem as TConstructorIngredient).countIngredient = 0;
                    return elem as TConstructorIngredient;
                });
            })
            .addCase(loadIngredients.pending, (state)=>{
                state.isLoading = true;
                state.error = "";
            })
            .addCase(loadIngredients.rejected, (state, action)=>{
                console.log(action)
                state.isLoading = false;
                state.error = action.error.message;
        })
    }
})

export const {increaseItemCount, decreaseItemCount, resetItemCount} = allIngredientsSlice.actions;
export const allIngredientsReducer = allIngredientsSlice.reducer;