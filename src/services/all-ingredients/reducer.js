import { createSlice } from '@reduxjs/toolkit'
import { loadIngredients } from './actions'
import { INGREDIENT_TYPE_BUN } from '../../utils/consts';

const allIngredientsSlice = createSlice({
    name: "allIngredients",
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    reducers:{
        increaseItemCount: (state, action)=>{
            state.data = state.data.map(elem=>{
                if(elem._id === action.payload.id){
                    elem.countIngredient++
                    if(elem.type === INGREDIENT_TYPE_BUN)
                        elem.countIngredient++
                }
                
                return elem;
            })
        },
        decreaseItemCount: (state, action)=>{
            state.data = state.data.map(elem=>{
                if(elem._id === action.payload.id){
                    elem.countIngredient--
                    if(elem.type === INGREDIENT_TYPE_BUN)
                        elem.countIngredient--
                }
                
                return elem;
            })
        }        
    },
    extraReducers: (builder)=>{
        builder
            .addCase(loadIngredients.fulfilled, (state, action)=>{
                state.data = action.payload.map(elem=>{
                    elem.countIngredient = 0;
                    return elem;
                });
            })
            .addCase(loadIngredients.pending, (state)=>{
                state.isLoading = true;
                state.error = null
            })
            .addCase(loadIngredients.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.payload;
            })
            
    }
})

export const {increaseItemCount, decreaseItemCount} = allIngredientsSlice.actions;
export const allIngredientsReducer = allIngredientsSlice.reducer;