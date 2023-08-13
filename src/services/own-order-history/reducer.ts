import {createReducer} from "@reduxjs/toolkit";
import {WebsocketStatus} from "../../utils/consts";
import {TWSOrderHistoryResponse} from "../../utils/types";
import {
    closeSetStatusOwnOrderHistory,
    connectingSetStatusOwnOrderHistory, errorSetOwnOrderHistory, messageSetOwnOrderHistory,
    openSetStatusOwnOrderHistory
} from './actions'

export const initialState: TWSOrderHistoryResponse = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    data: null
}

export const ownOrderHistoryReducer = createReducer(initialState, (builder)=>{
    builder
        .addCase(connectingSetStatusOwnOrderHistory, (state)=>{
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(openSetStatusOwnOrderHistory, (state)=>{
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = "";
        })
        .addCase(closeSetStatusOwnOrderHistory, (state)=>{
            state.status = WebsocketStatus.OFFLINE;
        })
        .addCase(errorSetOwnOrderHistory, (state, action)=>{
            state.connectionError = action.payload;
        })
        .addCase(messageSetOwnOrderHistory, (state, action)=>{
            state.data = {...action.payload, orders: action.payload.orders.reverse()};
        })
})

