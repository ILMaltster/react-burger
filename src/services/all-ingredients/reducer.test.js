import {allIngredientsReducer, decreaseItemCount, increaseItemCount, initialState, resetItemCount} from "./reducer";
import {
    ingredientsCatalogFakeDecrease,
    ingredientsCatalogFakeIncreased, ingredientsCatalogFakeReset,
    ingredientsCatalogFakeSource
} from "../../utils/test-fake-data/all-ingredients-reducer";
import {loadIngredients} from "./actions";

describe('all ingredients reducer', ()=>{
    it("should return the initial state", ()=>{
        expect(allIngredientsReducer(undefined, {})).toEqual(initialState)
    })
    it("increase bun type item count", ()=>{
        expect(
            allIngredientsReducer(
                {...initialState, data: ingredientsCatalogFakeSource},
                increaseItemCount("12345")
            )
        ).toEqual({...initialState, data: ingredientsCatalogFakeIncreased})
    })
    it("decrease main type item count", ()=>{
        expect(
            allIngredientsReducer(
                {...initialState, data: ingredientsCatalogFakeSource},
                decreaseItemCount("123456")
            )
        ).toEqual({...initialState, data: ingredientsCatalogFakeDecrease})
    })
    it("reset count in all ingredients", ()=>{
        expect(
            allIngredientsReducer(
                {...initialState, data: ingredientsCatalogFakeSource},
                resetItemCount()
            )
        ).toEqual({...initialState, data: ingredientsCatalogFakeReset})
    })
    it("reset count in all ingredients", ()=>{
        expect(
            allIngredientsReducer(
                {...initialState},
                loadIngredients.fulfilled(ingredientsCatalogFakeSource)
            )
        ).toEqual({...initialState, data: ingredientsCatalogFakeSource})
    })
    it("reset count in all ingredients", ()=>{
        expect(
            allIngredientsReducer(
                {...initialState},
                loadIngredients.pending()
            )
        ).toEqual({...initialState, isLoading: true, error: ""})
    })
    it("reset count in all ingredients", ()=>{
        expect(
            allIngredientsReducer(
                {...initialState},
                loadIngredients.rejected("test message")
            )
        ).toEqual({...initialState, isLoading: false, error:"test message"})
    })


})