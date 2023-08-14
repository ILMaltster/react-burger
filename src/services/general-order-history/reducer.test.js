import {generalOrderHistoryReducer, initialState} from "./reducer";
import {
    closeSetStatusGeneralOrderHistory,
    connectingSetStatusGeneralOrderHistory, errorSetGeneralOrderHistory, messageSetGeneralOrderHistory,
    openSetStatusGeneralOrderHistory
} from "./actions";
import {WebsocketStatus} from "../../utils/consts";
import {generalHistoryData} from "../../utils/test-fake-data/general-order-history-reducer";

describe("general order reducer", ()=>{
    it("should return initial state", ()=>{
        expect(
            generalOrderHistoryReducer(undefined, {})
        ).toEqual(initialState)
    })

    it("should set connecting status", ()=>{
        expect(
            generalOrderHistoryReducer(
                undefined,
                connectingSetStatusGeneralOrderHistory
            )
        ).toEqual({...initialState, status: WebsocketStatus.CONNECTING})
    })
    it("should set open status", ()=>{
        expect(
            generalOrderHistoryReducer(
                undefined,
                openSetStatusGeneralOrderHistory
            )
        ).toEqual({...initialState, status: WebsocketStatus.ONLINE, connectionError: ""})
    })
    it("should set close status", ()=>{
        expect(
            generalOrderHistoryReducer(
                undefined,
                closeSetStatusGeneralOrderHistory
            )
        ).toEqual({...initialState, status: WebsocketStatus.OFFLINE})
    })
    it("should set error", ()=>{
        expect(
            generalOrderHistoryReducer(
                undefined,
                errorSetGeneralOrderHistory("ERROR MESSAGE")
            )
        ).toEqual({...initialState, connectionError: "ERROR MESSAGE"})
    })
    it("should set incoming message", ()=>{
        expect(
            generalOrderHistoryReducer(
                undefined,
                messageSetGeneralOrderHistory(generalHistoryData)
            )
        ).toEqual({...initialState, data: generalHistoryData})
    })
})