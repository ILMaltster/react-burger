import {INGREDIENT_TYPES} from "./consts";

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


export interface IIngredientWithKey extends IIngredient{
        key: number;
}

export interface IGetUserResponse extends IResponseStatus{
        user: {
                email: string;
                name: string;
        }
}

export interface IUserCredentials {
        name: string;
        email: string;
        password: string;
}

export type TUpdateUserCredentialsData = Partial<IUserCredentials>;

export type TForgotPasswordData = Pick<IUserCredentials, "email">;

export type TLoginData = Omit<IUserCredentials, "name">;

export type TResetPasswordData = {
        password: string;
        token: string;
}

export type TIdsListData = {
        ingredients: Array<string>;
}

export type TUseDropConstuctor = {
        key: number;
        type: INGREDIENT_TYPES;
        _id: string;
}