import { createAsyncThunk } from "@reduxjs/toolkit";
import login from "../../utils/api/login";
import register from "../../utils/api/register";
import resetPassword from "../../utils/api/resetPassword";
import forgotPassword from "../../utils/api/forgotPassword";
import getUser from "../../utils/api/getUser";
import patchUser from "../../utils/api/patchUser";
import logout from "../../utils/api/logout";
import { setUser } from "./reducer";

export const fetchLogin = createAsyncThunk(
    "user/fetchLogin",
    async (payload, thunkAPI)=>{
        try{
            return await login(payload);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const fetchRegister = createAsyncThunk(
    "user/fetchRegister",
    async (payload, thunkAPI)=>{
        try{
            return await register(payload);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const fetchResetPassword = createAsyncThunk(
    "user/fetchResetPassword",
    async (payload, thunkAPI)=>{
        try{
            return await resetPassword(payload);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const fetchForgotPassword = createAsyncThunk(
    "user/fetchForgotPassword",
    async (payload, thunkAPI)=>{
        try{
            return await forgotPassword(payload);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
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
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const fetchPatchUser = createAsyncThunk(
    "user/fetchPatchUser",
    async (payload, thunkAPI)=>{
        try{
            return await patchUser(payload);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
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
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const checkUser = createAsyncThunk(
    "user/checkUser",
    async(payload, thunkAPI)=>{
        if(localStorage.getItem("accessToken")){
            const res = await thunkAPI.dispatch(fetchGetUser()).catch(()=>{
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                thunkAPI.dispatch(setUser(null))
            })
            return res.payload;
        }
    }
)