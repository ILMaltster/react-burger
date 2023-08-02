import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { INGREDIENT_TYPE_BUN } from '../../utils/consts';
import {TConstructorInitialState} from "../../utils/redux-types/data";
import {IIngredientWithKey, TSwapConstructorElem} from "../../utils/types";

const initialState: TConstructorInitialState= {
    mainIngredients: [],
    bun: null
}

const constructorSlice = createSlice({
    name: "constructorIngredients",
    initialState,
    reducers: {
        addIngredientToConstructor:(state, action:PayloadAction<IIngredientWithKey> )=>{
            if(action.payload.type === INGREDIENT_TYPE_BUN){
                state.bun = action.payload;
            }
            else{
                state.mainIngredients.push({...action.payload});
            }
        },
        deleteIngredient:(state, action:PayloadAction<number>)=>{
            state.mainIngredients = state.mainIngredients.filter(elem=>elem.key !== action.payload)
        },
        swapIngredient:(state, action:PayloadAction<TSwapConstructorElem>)=>{
            const dragId = state.mainIngredients.findIndex(x => x.key === action.payload.dragKey);
            const hoverId = state.mainIngredients.findIndex(x => x.key === action.payload.hoverKey);
            state.mainIngredients.splice(dragId, 0, state.mainIngredients.splice(hoverId, 1)[0])
        },
        resetConstructor:()=>{
            return initialState;
        },
    }
})

export const {
    addIngredientToConstructor,
    deleteIngredient,
    resetConstructor,
    swapIngredient
} = constructorSlice.actions;


export const constructorIngredientsReducer = constructorSlice.reducer;