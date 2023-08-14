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
    AuthError: string | undefined;
    profileLoading: boolean;
    profileError: string | undefined,
    newProfileDataApplied: boolean;
    newProfileDataAppliedError: string | undefined
}

export type TOrderInitialState = {
    selectedOrder: TOrderHistoryItem[] | null;
    order: ISendOrderResponse | null;
    isLoading: boolean;
    isNeedResetConstructor: boolean;
    error: string | undefined;
}

export type TConstructorInitialState = {
    mainIngredients: IIngredientWithKey[];
    bun: IIngredientWithKey | null;
}

export type TAllIngredientsInitialState = {
    data: TConstructorIngredient[];
    isLoading: boolean;
    error: string | undefined;
}