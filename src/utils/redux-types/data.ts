import {
    IIngredientWithKey,
    TConstructorIngredient,
    TOrderHistoryItem,
    TUserData
} from "../types";
import {ISendOrderResponse} from "../api/sendOrder";

export type TUserInitialState = {
    user: TUserData | null;
    isAuthChecked: boolean;
    AuthError: string;
    profileLoading: boolean;
    profileError: string,
    newProfileDataApplied: boolean;
    newProfileDataAppliedError: string
}

export type TOrderInitialState = {
    selectedOrder: TOrderHistoryItem[] | null;
    order: ISendOrderResponse | null;
    isLoading: boolean;
    isNeedResetConstructor: boolean;
    error: string;
}

export type TConstructorInitialState = {
    mainIngredients: IIngredientWithKey[];
    bun: IIngredientWithKey | null;
}

export type TAllIngredientsInitialState = {
    data: TConstructorIngredient[];
    isLoading: boolean;
    error: string;
}