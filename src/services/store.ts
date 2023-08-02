import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { allIngredientsReducer } from './all-ingredients/reducer';
import { constructorIngredientsReducer } from './constructor/reducer';
import { orderReducer } from './order/reducer';
import { userReducer } from './user/reducer';
import {socketOwnOrderHistoryMiddleware} from "../utils/middleware/socket-own-order-history";
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
import {socketGeneralOrderHistoryMiddleware} from "../utils/middleware/socket-general-order-history";
import {generalOrderHistoryReducer} from "./general-order-history/reducer";

const wsOwnHistoryActions = {
    connectOwnOrderHistory: connectOwnOrderHistory,
    disconnectOwnOrderHistory: disconnectOwnOrderHistory,
    openSetStatusOwnOrderHistory: openSetStatusOwnOrderHistory,
    closeSetStatusOwnOrderHistory: closeSetStatusOwnOrderHistory,
    errorSetOwnOrderHistory: errorSetOwnOrderHistory,
    messageSetOwnOrderHistory: messageSetOwnOrderHistory,
    connectingSetStatusOwnOrderHistory:connectingSetStatusOwnOrderHistory
}

const wsGeneralHistoryActions = {
    connectGeneralOrderHistory: connectGeneralOrderHistory,
    disconnectGeneralOrderHistory: disconnectGeneralOrderHistory,
    openSetStatusGeneralOrderHistory: openSetStatusGeneralOrderHistory,
    closeSetStatusGeneralOrderHistory: closeSetStatusGeneralOrderHistory,
    errorSetGeneralOrderHistory: errorSetGeneralOrderHistory,
    messageSetGeneralOrderHistory: messageSetGeneralOrderHistory,
    connectingSetStatusGeneralOrderHistory:connectingSetStatusGeneralOrderHistory
}

const rootReducer = combineReducers({
    allIngredients: allIngredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    order: orderReducer,
    user: userReducer,
    ownOrderHistory: ownOrderHistoryReducer,
    generalOrderHistory: generalOrderHistoryReducer
})

const ownOrderHistoryMiddleware = socketOwnOrderHistoryMiddleware(wsOwnHistoryActions);
const generalOrderHistoryMiddleware = socketGeneralOrderHistoryMiddleware(wsGeneralHistoryActions);

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