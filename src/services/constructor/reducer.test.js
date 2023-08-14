import {
    addIngredientToConstructor,
    constructorIngredientsReducer,
    deleteIngredient,
    initialState, resetConstructor,
    swapIngredient
} from "./reducer";
import {
    constructorAddedIngredientFake, constructorDeletedItemFake,
    constructorItemFake,
    constructorSourceFake, constructorSwappedFake
} from "../../utils/test-fake-data/constructor-reducer";


describe("constructor reducer", ()=>{
    it("should return initial state", ()=>{
        expect(constructorIngredientsReducer(undefined,{})).toEqual(initialState)
    })

    it("should add ingredient to state", ()=>{
        expect(
            constructorIngredientsReducer(
                {...initialState, mainIngredients: constructorSourceFake},
                addIngredientToConstructor(constructorItemFake)
        )).toEqual({...initialState, mainIngredients: constructorAddedIngredientFake})
    })

    it("should delete ingredient from state", ()=>{
        expect(
            constructorIngredientsReducer(
                {...initialState, mainIngredients: constructorSourceFake},
                deleteIngredient(0.02577731006719073)
        )).toEqual({...initialState, mainIngredients: constructorDeletedItemFake})
    })

    it("should swap ingredient in state", ()=>{
        expect(
            constructorIngredientsReducer(
                {...initialState, mainIngredients: constructorSourceFake},
                swapIngredient({dragKey: 0.02577731006719073, hoverKey: 0.02577731006719071})
            )
        ).toEqual({...initialState, mainIngredients: constructorSwappedFake})
    })
    it("should reset state", ()=>{
        expect(
            constructorIngredientsReducer(
                {...initialState, mainIngredients: constructorSourceFake, bun: constructorItemFake},
                resetConstructor()
            )
        ).toEqual({...initialState})
    })
})