import {createAction} from "@reduxjs/toolkit";
import {TWSOrderHistoryData} from "../../utils/types";

export const connectGeneralOrderHistory =
    createAction<string, 'GENERAL_ORDER_HISTORY_CONNECT'>('GENERAL_ORDER_HISTORY_CONNECT');
export const disconnectGeneralOrderHistory =
    createAction('GENERAL_ORDER_HISTORY_DISCONNECT');
export const connectingSetStatusGeneralOrderHistory =
    createAction('GENERAL_ORDER_HISTORY_SET_STATUS_CONNECT');
export const openSetStatusGeneralOrderHistory =
    createAction('GENERAL_ORDER_HISTORY_SET_STATUS_OPEN');
export const closeSetStatusGeneralOrderHistory =
    createAction('GENERAL_ORDER_HISTORY_SET_STATUS_CLOSE');
export const errorSetGeneralOrderHistory =
    createAction<string, 'GENERAL_ORDER_HISTORY_SET_ERROR'>('GENERAL_ORDER_HISTORY_SET_ERROR');
export const messageSetGeneralOrderHistory =
    createAction<TWSOrderHistoryData, 'GENERAL_ORDER_HISTORY_SET_MESSAGE'>('GENERAL_ORDER_HISTORY_SET_MESSAGE');

