import {createReducer} from "@reduxjs/toolkit";
import {WebsocketStatus} from "../../utils/consts";
import {TWSOrderHistoryResponse} from "../../utils/types";
import {
    closeSetStatusGeneralOrderHistory,
    connectingSetStatusGeneralOrderHistory, errorSetGeneralOrderHistory, messageSetGeneralOrderHistory,
    openSetStatusGeneralOrderHistory
} from './actions'

const initialState: TWSOrderHistoryResponse = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    data: null
}

export const generalOrderHistoryReducer = createReducer(initialState, builder => {
    builder
        .addCase(connectingSetStatusGeneralOrderHistory, (state)=>{
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(openSetStatusGeneralOrderHistory, (state)=>{
        state.status = WebsocketStatus.ONLINE;
        state.connectionError = "";
        })
        .addCase(closeSetStatusGeneralOrderHistory, (state)=>{
            state.status = WebsocketStatus.OFFLINE;
        })
        .addCase(errorSetGeneralOrderHistory, (state, action)=>{
            state.connectionError = action.payload;
        })
        .addCase(messageSetGeneralOrderHistory, (state, action)=>{
            state.data = action.payload;
        })

})

