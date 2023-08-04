import {Middleware} from "redux";
import {TRootState} from "../../services/store";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

type TWsActions = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    connectingSetStatus: ActionCreatorWithoutPayload
    openSetStatus: ActionCreatorWithoutPayload;
    closeSetStatus: ActionCreatorWithoutPayload;
    errorSet: ActionCreatorWithPayload<string>;
    messageSet: ActionCreatorWithPayload<any>;
}

export const socketMiddleware = (wsActions: TWsActions): Middleware<{}, TRootState> =>{
    return (store)=>{
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = '';

        return next => action => {
            const {dispatch} = store;
            const {
                connect, disconnect, openSetStatus,
                closeSetStatus, errorSet, messageSet,
                connectingSetStatus
            } = wsActions;

            if(connect.match(action)){
                url = action.payload;
                socket = new WebSocket(url);
                isConnected = true;
                dispatch(connectingSetStatus())
            }
            if(socket){
                socket.onopen = () =>{
                    dispatch(openSetStatus())
                }
                socket.onerror = () => {
                    dispatch(errorSet("ОШИБКА"));
                }
                socket.onmessage = event =>{
                    const parsedDatra = JSON.parse(event.data);
                    dispatch(messageSet(parsedDatra));
                }
                socket.onclose = event => {
                    if(event.code !== 1000){
                        dispatch(errorSet(event.code.toString()));
                    }
                    dispatch(closeSetStatus());
                    if(isConnected){
                        dispatch(connectingSetStatus());
                        reconnectTimer = window.setTimeout(()=>{
                            dispatch(connect(url));
                        }, 3000);
                    }
                }
                if(disconnect.match(action)){
                    clearTimeout(reconnectTimer);
                    isConnected = false;
                    reconnectTimer = 0;
                    socket.close();
                    dispatch(closeSetStatus());
                }
            }
            next(action);
        }
    }
}