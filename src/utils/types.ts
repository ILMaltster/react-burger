import {INGREDIENT_TYPES, WebsocketStatus} from "./consts";

export interface IResponseStatus{
        success: boolean;
}

export interface IIngredient {
        _id: string;
        name: string;
        type: string;
        proteins: number;
        fat: number;
        carbohydrates: number;
        calories: number;
        price: number;
        image: string;
        image_mobile: string;
        image_large: string;
        __v: number;
}

export type TConstructorIngredient = IIngredient & {
        countIngredient: number;
}

export type TSelectedOrder = IResponseStatus & {
        orders: TOrderHistoryItem[]
}

export interface IIngredientWithKey extends IIngredient{
        key: number;
}

export type TLoginFormData = {
        email: string,
        password: string
}

export type TUserData = {
        name: string;
        email: string;
}

export type TWSOrderHistoryResponse = {
        status: WebsocketStatus;
        data: TWSOrderHistoryData | null;
        connectionError: string;
}

export type TWSOrderHistoryData = {
        orders: TOrderHistoryItem[];
        total: number;
        totalToday: number;
}

export enum TOrderStatus{
        DONE = "done",
        PENDING = "pending",
        CREATED = "created",
        NONE = ""
}

export type TOrderHistoryItem = {
        name: string;
        ingredients: string[];
        _id: string;
        status: TOrderStatus;
        number: number;
        createdAt: string;
        updatedAt: string;
}

export interface IGetUserResponse extends IResponseStatus{
        user: TUserData
}

export interface IUserCredentials extends TUserData{
        password: string;
}

export type TUpdateUserCredentialsData = Partial<IUserCredentials>;

export type TForgotPasswordData = Pick<IUserCredentials, "email">;

export type TLoginDataWithTokenResponse = IGetUserResponse & {
        accessToken: string;
        refreshToken: string;
};

export type TResetPasswordData = {
        password: string;
        token: string;
}

export type TIdsListData = Array<string>;
export type TUseDropConstuctor = {
        key: number;
        type: INGREDIENT_TYPES;
        _id: string;
}

export type TReadyOrder = {
        createdAt: string;
        ingredients: IIngredient[];
        number: number;
        owner: TUserData & {
                createdAt: string;
                updatedAt: string;
        };
        price: number;
        status: string;
        updateAt: string;
        _id: string;
}

export type TSwapConstructorElem = {
        dragKey: number;
        hoverKey: number;
}

export type TSelectedOrderInfo = {
        ingredients: TSelectedOrderIngredient[];
        totalPrice: number;
}

export type TSelectedOrderIngredient = {
   ingredient: TConstructorIngredient;
   count: number;
}