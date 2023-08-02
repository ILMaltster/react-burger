import { createAsyncThunk } from "@reduxjs/toolkit";
import login from "../../utils/api/login";
import register from "../../utils/api/register";
import resetPassword from "../../utils/api/resetPassword";
import forgotPassword from "../../utils/api/forgotPassword";
import getUser from "../../utils/api/getUser";
import patchUser from "../../utils/api/patchUser";
import logout from "../../utils/api/logout";
import {
    IUserCredentials,
    TForgotPasswordData,
    TLoginFormData,
    TResetPasswordData
} from "../../utils/types";

export const fetchLogin = createAsyncThunk(
    "user/fetchLogin",
    async (payload: TLoginFormData, thunkAPI)=>{
        try{
            return await login(payload);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const fetchRegister = createAsyncThunk(
    "user/fetchRegister",
    async (payload: IUserCredentials, thunkAPI)=>{
        try{
            return await register(payload);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const fetchResetPassword = createAsyncThunk(
    "user/fetchResetPassword",
    async (payload: TResetPasswordData, thunkAPI)=>{
        try{
            return await resetPassword(payload);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const fetchForgotPassword = createAsyncThunk(
    "user/fetchForgotPassword",
    async (payload: TForgotPasswordData, thunkAPI)=>{
        try{
            return await forgotPassword(payload);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const fetchGetUser = createAsyncThunk(
    "user/fetchGetUser",
    async (payload, thunkAPI)=>{
        try{
            return await getUser();
        }
        catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const fetchPatchUser = createAsyncThunk(
    "user/fetchPatchUser",
    async (payload:  Partial<IUserCredentials>, thunkAPI)=>{
        try{
            return await patchUser(payload);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const fetchLogout = createAsyncThunk(
    "user/fetchLogout",
    async (payload, thunkAPI)=>{
        try{
            return await logout();
        }
        catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const checkUser = createAsyncThunk(
    "user/checkUser",
    async(payload, thunkAPI)=>{
        if(localStorage.getItem("accessToken")){
            try {
                return await getUser();
            }
            catch(error){
                return thunkAPI.rejectWithValue(error);
            }
        }
    }
)