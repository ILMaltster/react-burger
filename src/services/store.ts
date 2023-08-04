import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { allIngredientsReducer } from './all-ingredients/reducer';
import { constructorIngredientsReducer } from './constructor/reducer';
import { orderReducer } from './order/reducer';
import { userReducer } from './user/reducer';
import {socketMiddleware} from "../utils/middleware/socket";
import {
    closeSetStatusOwnOrderHistory, disconnectOwnOrderHistory, connectOwnOrderHistory,
    connectingSetStatusOwnOrderHistory, errorSetOwnOrderHistory, messageSetOwnOrderHistory,
    openSetStatusOwnOrderHistory
} from './own-order-history/actions'
import {ownOrderHistoryReducer} from "./own-order-history/reducer";
import {
    closeSetStatusGeneralOrderHistory,
    connectGeneralOrderHistory, connectingSetStatusGeneralOrderHistory,
    disconnectGeneralOrderHistory, errorSetGeneralOrderHistory, messageSetGeneralOrderHistory,
    openSetStatusGeneralOrderHistory
} from "./general-order-history/actions";
import {generalOrderHistoryReducer} from "./general-order-history/reducer";

const wsOwnHistoryActions = {
    connect: connectOwnOrderHistory,
    disconnect: disconnectOwnOrderHistory,
    openSetStatus: openSetStatusOwnOrderHistory,
    closeSetStatus: closeSetStatusOwnOrderHistory,
    errorSet: errorSetOwnOrderHistory,
    messageSet: messageSetOwnOrderHistory,
    connectingSetStatus:connectingSetStatusOwnOrderHistory
}

const wsGeneralHistoryActions = {
    connect: connectGeneralOrderHistory,
    disconnect: disconnectGeneralOrderHistory,
    openSetStatus: openSetStatusGeneralOrderHistory,
    closeSetStatus: closeSetStatusGeneralOrderHistory,
    errorSet: errorSetGeneralOrderHistory,
    messageSet: messageSetGeneralOrderHistory,
    connectingSetStatus: connectingSetStatusGeneralOrderHistory
}

const rootReducer = combineReducers({
    allIngredients: allIngredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    order: orderReducer,
    user: userReducer,
    ownOrderHistory: ownOrderHistoryReducer,
    generalOrderHistory: generalOrderHistoryReducer
})

const ownOrderHistoryMiddleware = socketMiddleware(wsOwnHistoryActions);
const generalOrderHistoryMiddleware = socketMiddleware(wsGeneralHistoryActions);

export const getStore = () =>{
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware)=>{
            return getDefaultMiddleware().concat(ownOrderHistoryMiddleware, generalOrderHistoryMiddleware)
        }
    })
}

export type TRootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof getStore>;
export type AppDispatch = AppStore['dispatch'];