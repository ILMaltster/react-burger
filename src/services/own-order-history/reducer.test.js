import {initialState, ownOrderHistoryReducer} from "./reducer";
import {
    closeSetStatusOwnOrderHistory,
    connectingSetStatusOwnOrderHistory,
    errorSetOwnOrderHistory,
    messageSetOwnOrderHistory,
    openSetStatusOwnOrderHistory
} from "./actions";
import {WebsocketStatus} from "../../utils/consts";
import {generalHistoryData} from "../../utils/test-fake-data/general-order-history-reducer";

describe("general order reducer", ()=>{
    it("should return initial state", ()=>{
        expect(
            ownOrderHistoryReducer(undefined, {})
        ).toEqual(initialState)
    })

    it("should set connecting status", ()=>{
        expect(
            ownOrderHistoryReducer(
                undefined,
                connectingSetStatusOwnOrderHistory
            )
        ).toEqual({...initialState, status: WebsocketStatus.CONNECTING})
    })
    it("should set open status", ()=>{
        expect(
            ownOrderHistoryReducer(
                undefined,
                openSetStatusOwnOrderHistory
            )
        ).toEqual({...initialState, status: WebsocketStatus.ONLINE, connectionError: ""})
    })
    it("should set close status", ()=>{
        expect(
            ownOrderHistoryReducer(
                undefined,
                closeSetStatusOwnOrderHistory
            )
        ).toEqual({...initialState, status: WebsocketStatus.OFFLINE})
    })
    it("should set error", ()=>{
        expect(
            ownOrderHistoryReducer(
                undefined,
                errorSetOwnOrderHistory("ERROR MESSAGE")
            )
        ).toEqual({...initialState, connectionError: "ERROR MESSAGE"})
    })
    it("should set incoming message", ()=>{
        expect(
            ownOrderHistoryReducer(
                undefined,
                messageSetOwnOrderHistory(generalHistoryData)
            )
        ).toEqual({...initialState, data: generalHistoryData})
    })
})