import {initialState, orderReducer, resetOrderDetails} from "./reducer";
import {orderItemsSourceFake, selectedOrderSourceFake} from "../../utils/test-fake-data/order-reducer";
import {getOrderInfoByNumber, uploadOrderIngredients} from "./action";

describe("order reducet test", ()=>{
    it("should return initial state", ()=>{
        expect(
            orderReducer(undefined, {})
        ).toEqual(initialState)
    })
    it("should reset order details", ()=>{
        expect(
            orderReducer(
                {
                    ...initialState,
                    isNeedResetConstructor: true,
                    order: orderItemsSourceFake
                },
                resetOrderDetails()
            )
        ).toEqual(initialState)
    })
    it("should set fulfilled flags", ()=>{
        expect(
            orderReducer({
                ...initialState,
                isNeedResetConstructor: false,
                isLoading: true,
            }, uploadOrderIngredients.fulfilled(orderItemsSourceFake))
        ).toEqual(
            {
                ...initialState,
                isNeedResetConstructor: true,
                isLoading: false,
                order: orderItemsSourceFake
            },
        )
    })
    it("should set reject flags", ()=>{
        expect(
            orderReducer(undefined, uploadOrderIngredients.rejected("test reject mess"))
        ).toEqual({...initialState, isLoading: false, error: "test reject mess"})
    })
    it("should set pending flags", ()=>{
        expect(
            orderReducer(undefined, uploadOrderIngredients.pending())
        ).toEqual({...initialState, isLoading: true, error: ""})
    })
    it("should get order info by number", ()=>{
        expect(
            orderReducer(
                undefined,
                getOrderInfoByNumber.fulfilled({orders: [selectedOrderSourceFake]})
            )
        ).toEqual({...initialState, selectedOrder: [selectedOrderSourceFake]})
    })
})