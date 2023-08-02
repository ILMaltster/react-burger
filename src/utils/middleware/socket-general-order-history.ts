import {Middleware} from "redux";
import {TRootState} from "../../services/store";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export type TWsActionsTypesGeneralOrderHistory = {
    connectGeneralOrderHistory: ActionCreatorWithPayload<string>;
    disconnectGeneralOrderHistory: ActionCreatorWithoutPayload;
    connectingSetStatusGeneralOrderHistory: ActionCreatorWithoutPayload
    openSetStatusGeneralOrderHistory: ActionCreatorWithoutPayload;
    closeSetStatusGeneralOrderHistory: ActionCreatorWithoutPayload;
    errorSetGeneralOrderHistory: ActionCreatorWithPayload<string>;
    messageSetGeneralOrderHistory: ActionCreatorWithPayload<any>;
}

export const socketGeneralOrderHistoryMiddleware = (wsActions: TWsActionsTypesGeneralOrderHistory): Middleware<{}, TRootState> =>{
    return (store)=>{
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = '';

        return next => action => {
            const {dispatch} = store;
            const {
                connectGeneralOrderHistory, disconnectGeneralOrderHistory, openSetStatusGeneralOrderHistory,
                closeSetStatusGeneralOrderHistory, errorSetGeneralOrderHistory, messageSetGeneralOrderHistory,
                connectingSetStatusGeneralOrderHistory
            } = wsActions;

            if(connectGeneralOrderHistory.match(action)){
                url = action.payload;
                socket = new WebSocket(url);
                isConnected = true;
                dispatch(connectingSetStatusGeneralOrderHistory())
            }
            if(socket){
                socket.onopen = () =>{
                    dispatch(openSetStatusGeneralOrderHistory())
                }
                socket.onerror = () => {
                    console.log("ОШИБКА СОКЕТА");
                    dispatch(errorSetGeneralOrderHistory("ОШИБКА"));
                }
                socket.onmessage = event =>{
                    const parsedDatra = JSON.parse(event.data);
                    dispatch(messageSetGeneralOrderHistory(parsedDatra));
                }
                socket.onclose = event => {
                    if(event.code !== 1000){
                        console.log('error');
                        dispatch(errorSetGeneralOrderHistory(event.code.toString()));
                    }
                    dispatch(closeSetStatusGeneralOrderHistory());
                    if(isConnected){
                        dispatch(connectingSetStatusGeneralOrderHistory());
                        reconnectTimer = window.setTimeout(()=>{
                            dispatch(connectGeneralOrderHistory(url));
                        }, 3000);
                    }
                }
                if(disconnectGeneralOrderHistory.match(action)){
                    clearTimeout(reconnectTimer);
                    isConnected = false;
                    reconnectTimer = 0;
                    socket.close();
                    dispatch(closeSetStatusGeneralOrderHistory());
                }
            }
            next(action);
        }
    }
}