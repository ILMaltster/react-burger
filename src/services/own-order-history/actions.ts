import {createAction} from "@reduxjs/toolkit";
import {TWSOrderHistoryData} from "../../utils/types";

export const connectOwnOrderHistory =
    createAction<string, 'OWN_ORDER_HISTORY_CONNECT'>('OWN_ORDER_HISTORY_CONNECT');
export const disconnectOwnOrderHistory =
    createAction('OWN_ORDER_HISTORY_DISCONNECT');
export const connectingSetStatusOwnOrderHistory =
    createAction('OWN_ORDER_HISTORY_SET_STATUS_CONNECT');
export const openSetStatusOwnOrderHistory =
    createAction('OWN_ORDER_HISTORY_SET_STATUS_OPEN');
export const closeSetStatusOwnOrderHistory =
    createAction('OWN_ORDER_HISTORY_SET_STATUS_CLOSE');
export const errorSetOwnOrderHistory =
    createAction<string, 'OWN_ORDER_HISTORY_SET_ERROR'>('OWN_ORDER_HISTORY_SET_ERROR');
export const messageSetOwnOrderHistory =
    createAction<TWSOrderHistoryData, 'OWN_ORDER_HISTORY_SET_MESSAGE'>('OWN_ORDER_HISTORY_SET_MESSAGE');

