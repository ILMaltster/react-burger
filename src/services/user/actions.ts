import { createAsyncThunk } from "@reduxjs/toolkit";
import login from "../../utils/api/login";
import register from "../../utils/api/register";
import resetPassword from "../../utils/api/resetPassword";
import forgotPassword from "../../utils/api/forgotPassword";
import getUser from "../../utils/api/getUser";
import patchUser from "../../utils/api/patchUser";
import logout from "../../utils/api/logout";
import {
    IForgotPasswordResponse,
    IGetUserResponse, ILogoutResponse,
    IRegisterResponse, IResetPasswordResponse,
    IUserCredentials,
    TForgotPasswordData, TLoginDataWithTokenResponse,
    TLoginFormData, TRejectedData,
    TResetPasswordData
} from "../../utils/types";

export const fetchLogin = createAsyncThunk<TLoginDataWithTokenResponse, TLoginFormData, TRejectedData>(
    "user/fetchLogin",
    async (payload)=>{
        return await login(payload);
    }
)

export const fetchRegister = createAsyncThunk<IRegisterResponse, IUserCredentials, TRejectedData>(
    "user/fetchRegister",
    async (payload: IUserCredentials)=>{
        return await register(payload);
    }
)

export const fetchResetPassword = createAsyncThunk<IResetPasswordResponse, TResetPasswordData, TRejectedData>(
    "user/fetchResetPassword",
    async (payload)=>{
        return await resetPassword(payload);

    }
)

export const fetchForgotPassword = createAsyncThunk<IForgotPasswordResponse, TForgotPasswordData, TRejectedData>(
    "user/fetchForgotPassword",
    async (payload: TForgotPasswordData)=>{
            return await forgotPassword(payload)
    }
)

export const fetchGetUser = createAsyncThunk<IGetUserResponse, void, TRejectedData>(
    "user/fetchGetUser",
    async ()=>{
        return await getUser();
    }
)

export const fetchPatchUser = createAsyncThunk<IGetUserResponse,Partial<IUserCredentials>,TRejectedData>(
    "user/fetchPatchUser",
    async (payload)=>{
        return await patchUser(payload);
    }
)

export const fetchLogout = createAsyncThunk<ILogoutResponse, void, TRejectedData>(
    "user/fetchLogout",
    async ()=>{
        return await logout();
    }
)
export const checkUser = createAsyncThunk<IGetUserResponse | null, void, TRejectedData>(
    "user/checkUser",
    async()=>{
        if(localStorage.getItem("accessToken")){
            return await getUser();
        }
        else return null;
    }
)