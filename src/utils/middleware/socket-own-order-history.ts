import {Middleware} from "redux";
import {TRootState} from "../../services/store";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export type TWsActionsTypesOwnOrderHistory = {
    connectOwnOrderHistory: ActionCreatorWithPayload<string>;
    disconnectOwnOrderHistory: ActionCreatorWithoutPayload;
    connectingSetStatusOwnOrderHistory: ActionCreatorWithoutPayload
    openSetStatusOwnOrderHistory: ActionCreatorWithoutPayload;
    closeSetStatusOwnOrderHistory: ActionCreatorWithoutPayload;
    errorSetOwnOrderHistory: ActionCreatorWithPayload<string>;
    messageSetOwnOrderHistory: ActionCreatorWithPayload<any>;
}

export const socketOwnOrderHistoryMiddleware = (wsActions: TWsActionsTypesOwnOrderHistory): Middleware<{}, TRootState> =>{
    return (store)=>{
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = '';

        return next => action => {
            const {dispatch} = store;
            const {
                connectOwnOrderHistory, disconnectOwnOrderHistory, openSetStatusOwnOrderHistory,
                closeSetStatusOwnOrderHistory, errorSetOwnOrderHistory, messageSetOwnOrderHistory,
                connectingSetStatusOwnOrderHistory
            } = wsActions;

            if(connectOwnOrderHistory.match(action)){
                url = action.payload;
                socket = new WebSocket(url);
                isConnected = true;
                dispatch(connectingSetStatusOwnOrderHistory())
            }
            if(socket){
                socket.onopen = () =>{
                    dispatch(openSetStatusOwnOrderHistory())
                }
                socket.onerror = () => {
                    console.log("ОШИБКА СОКЕТА");
                    dispatch(errorSetOwnOrderHistory("ОШИБКА"));
                }
                socket.onmessage = event =>{
                    const parsedDatra = JSON.parse(event.data);
                    dispatch(messageSetOwnOrderHistory(parsedDatra));
                }
                socket.onclose = event => {
                    if(event.code !== 1000){
                        console.log('error');
                        dispatch(errorSetOwnOrderHistory(event.code.toString()));
                    }
                    dispatch(closeSetStatusOwnOrderHistory());
                    if(isConnected){
                        dispatch(connectingSetStatusOwnOrderHistory());
                        reconnectTimer = window.setTimeout(()=>{
                            dispatch(connectOwnOrderHistory(url));
                        }, 3000);
                    }
                }
                if(disconnectOwnOrderHistory.match(action)){
                    clearTimeout(reconnectTimer);
                    isConnected = false;
                    reconnectTimer = 0;
                    socket.close();
                    dispatch(closeSetStatusOwnOrderHistory());
                }
            }
            next(action);
        }
    }
}